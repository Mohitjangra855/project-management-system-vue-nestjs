import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  //creating new project here
  async createProject(createProjectDto: CreateProjectDto, userId: string) {
    const { teamMembers, ...projectData } = createProjectDto;
    const project = await this.prisma.project.create({
      data: { ...projectData },
    });
    if (teamMembers && teamMembers.length > 0) {
      const assignmentsData = teamMembers.map((memberId) => ({
        userId: memberId,
        projectId: project.id,
      }));

      await this.prisma.assignment.createMany({
        data: assignmentsData,
      });
    }
    console.log('new project added: ', project);
    return project;
  }
  //find all projects here
  async findAll() {
    const projects = await this.prisma.project.findMany({
      include: {
        assignments: {
          select: { userId: true },
        },
      },
    });

    const projectsWithMembers = await Promise.all(
      projects.map(async (project) => ({
        ...project,
        teamMembers: await Promise.all(
          project.assignments.map((a) =>
            this.prisma.user.findUnique({
              where: { id: a.userId },
              select: { id: true, name: true, position: true, role: true },
            }),
          ),
        ),
      })),
    );

    return projectsWithMembers;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }
  //update project status here...
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { teamMembers, ...projectData } = updateProjectDto;
    
    // Update project basic details
    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: {
        status: projectData.status,
        title: projectData.title,
        description: projectData.description,
        technologies: projectData.technologies,
      },
    });

    // Update team members if provided
    if (teamMembers && teamMembers.length >= 0) {
      // First, delete existing assignments
      await this.prisma.assignment.deleteMany({
        where: { projectId: id },
      });

      // Then, create new assignments if team members exist
      if (teamMembers.length > 0) {
        const assignmentsData = teamMembers.map((memberId) => ({
          userId: memberId,
          projectId: id,
        }));

        await this.prisma.assignment.createMany({
          data: assignmentsData,
        });
      }
    }

    return updatedProject;
  }

  async remove(id: string) {
    await this.prisma.assignment.deleteMany({
      where: { projectId: id },
    });
    await this.prisma.project.delete({
      where: { id },
    });
    return 'Project successfully deleted.';
  }
  
}
