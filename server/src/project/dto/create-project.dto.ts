import { IsArray, IsEnum, IsString } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsArray()
  technologies: string[];

  @IsArray()
  teamMembers?: string[]; // user IDs
}
