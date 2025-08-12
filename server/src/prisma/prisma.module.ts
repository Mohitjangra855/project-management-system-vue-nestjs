// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes it available globally (optional but useful)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
