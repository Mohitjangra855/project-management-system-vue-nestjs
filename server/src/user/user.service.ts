// user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Position } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/Login-user-dto';
import { RegisterUserDto } from './dto/Register-user-dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(data: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { email } = data;
    console.log('password', hashedPassword);
    const exists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exists) return 'email already exists, try to login.';
    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword, // Ensure to hash the password before storing it in production
        role: Role[data.role?.toUpperCase() as keyof typeof Role],
        position:
          Position[data.position?.toUpperCase() as keyof typeof Position], // ✅ cast to enum
      },
    });
    console.log('id', newUser);
    const token = await this.jwtService.sign(
      { id: newUser.id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      },
    );
    return token;
  }
  async login(LoginUserDto: LoginUserDto) {
    const { email, password } = LoginUserDto;

    const checkExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!checkExists) {
      return { token: 'invalid email or password', user: '', status: false };
    }
    const compare = bcrypt.compareSync(password, checkExists.password);
    if (!compare) {
      return { token: 'invalid email or password', user: '', status: false };
    }
    const token = await this.jwtService.sign(
      { id: checkExists.id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      },
    );
    console.log('token: ', token);

    return { token, user: checkExists, status: true };
  }
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  //find me
  async getMe(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  deleteUser(id: string) {
    console.log('user Successfully deleted!');
    return this.prisma.user.delete({
      where: { id },
    });
  }
  async updateProfile(userId, updateUserDto) {
    const { name, email, position, oldPassword, newPassword } = updateUserDto;
    const id = userId;
    
   
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!currentUser) {
      return { status: false, message: 'User not found' };
    }
    
    
    if (email && email !== currentUser.email) {
      const checkEmail = await this.prisma.user.findUnique({
        where: { email },
      });
      
      if (checkEmail) {
        return { status: false, message: 'Email already exists' };
      }
    }
    
    const updatedData: any = {
      name,
      email: email, // Use provided email or keep current
    };
    
    if (position) {
      updatedData.position =
        Position[position.toUpperCase() as keyof typeof Position];
    }
    
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updatedData,
    });
    
    if (oldPassword && newPassword) {
      const passData = await this.changePassword(id, oldPassword, newPassword);
      return { updatedUser, passData };
    }
    
    return {
      updatedUser,
      status: true,
      message: 'Profile updated successfully',
    };
  }
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    console.log('isOldPasswordValid', isOldPasswordValid);
    if (!isOldPasswordValid) {
      return { message: 'Old password is incorrect' };
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });
    await this.cacheManager.del('current-user');
    return {
      status: true,
      message: 'Profile and Password updated successfully',
      user: updatedUser,
    };
  }
}
