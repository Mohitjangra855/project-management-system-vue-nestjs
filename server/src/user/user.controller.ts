// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Res,
  Req,
  Put,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/Login-user-dto';
import { RegisterUserDto } from './dto/Register-user-dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CacheKey } from '@nestjs/cache-manager/dist/decorators/cache-key.decorator';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  @Post('/register')
  async register(@Body() RegisterUserDto: RegisterUserDto) {
    const result = await this.userService.register(RegisterUserDto);
    this.cacheManager.del('all-users'); // Clear cache on registration
    return result;
  }

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: LoginUserDto,
  })
  @Post('/login')
  async Login(
    @Body() LoginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.login(LoginUserDto);

    // Only set cookie if login is successful
    if (result.status) {
      res.cookie('cookie', result.token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log('Login successfully....');
    } else {
      console.log('Login failed....');
    }

    // Return the complete result object (token, user, status)
    return result;
  }
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-users')
  @CacheTTL(300000) // Cache for 5 minutes
  @Get()
  async findAll() {
    const data = await this.userService.getAllUsers();
    return data;
  }
  //get me controller
  @UseInterceptors(CacheInterceptor)
  @CacheKey('current-user')
  @CacheTTL(300000) // Cache for 5 minutes
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Req() req) {
    return this.userService.getMe(req.user.id);
  }

  //Get user by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getMe(id);
  }
  //Update user profile
  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  async updateProfile(
    @Body()
    {
      name,
      email,
      oldPassword,
      newPassword,
    }: {
      name: string;
      email: string;
      oldPassword?: string;
      newPassword?: string;
    },
    @Req() req,
  ) {
    const userId = req.user.id;
    const updatedData = await this.userService.updateProfile(userId, {
      name,
      email,
      oldPassword,
      newPassword,
    });
    this.cacheManager.del('current-user');  // Clear cache for current user
    return updatedData;
  }
//Admin can update user profile
  @UseGuards(JwtAuthGuard)
  @Put('/user-profile/:id')
  async updateEmployeesProfile(
    @Body()
    {
      name,
      email,
      position,
      oldPassword,
      newPassword,
    }: {
      name: string;
      email: string;
      position?: string;
      oldPassword?: string;
      newPassword?: string;
    },
    @Param('id') id: string,
  ) {
    const userId = id;
    console.log('Updating user profile for ID:', userId);
    const updatedData = await this.userService.updateProfile(userId, {
      name,
      email,
      position,
      oldPassword,
      newPassword,
    });
    this.cacheManager.del('all-users');
    return updatedData;
  }
  //Logout user functionlity
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
    console.log('Logged out successfully');
    this.cacheManager.del('current-user'); // Clear cache on logout
    return { message: 'Logged out successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    this.cacheManager.del('all-users');
    return { message: 'User deleted successfully', user: deletedUser };
  }
}
