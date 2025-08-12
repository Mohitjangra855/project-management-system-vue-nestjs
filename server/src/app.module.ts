import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ClsModule } from 'nestjs-cls';
import { AuthModule } from './auth/auth.module';
import { IsOwnerAndAdminMiddleware } from './middleware/isOwner.admin';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from './config/redis.config';
import { CacheServiceModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync(RedisOptions),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    CacheServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [CacheModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsOwnerAndAdminMiddleware)
      .forRoutes({ path: 'users/me', method: RequestMethod.GET });
  }
}
