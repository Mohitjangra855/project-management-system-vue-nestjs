import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateProjectDto } from './dto/update-project.dto';
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.cookie;
    console.log('token: ', token);
    if (token) {
      const decode = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString(),
      );
      const userId = decode.id;
      const newProject = await this.projectService.createProject(
        createProjectDto,
        userId,
      );
      this.cacheManager.del('all-projects');
      return newProject;
    } else {
      console.log('data that come form vue,js: ', createProjectDto);
      return 'user not authorized!';
    }
  }
  //find all project
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-projects')
  @CacheTTL(300000) // Cache for 5 minutes
  @Get()
  findAll() {
    console.log('Fetching all projects............');
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  // change status
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateProjectDto: UpdateProjectDto,
  ) {
    console.log('Updating project status:', id, UpdateProjectDto);
    
    const updatedProject = await this.projectService.update(id, UpdateProjectDto);
    // Clear the cache for all projects after updating a project
    await this.cacheManager.del('all-projects');
    return updatedProject;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProject = await this.projectService.remove(id);

    // Clear the cache for all projects after updating a project
    await this.cacheManager.del('all-projects');
    return deletedProject;
  }

}
