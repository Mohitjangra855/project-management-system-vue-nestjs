import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { IsOwnerAndAdminMiddleware } from 'src/middleware/isOwner.admin';

@Module({

  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(IsOwnerAndAdminMiddleware)
    .forRoutes({ path: 'project/:id/status', method: RequestMethod.PATCH })
  }
}
