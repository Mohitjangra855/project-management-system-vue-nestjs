import { Injectable, NestMiddleware } from '@nestjs/common';
import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IsOwnerAndAdminMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.cookie;
      if (token) {
        const userId = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64').toString(),
        ).id;
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
        });
        // ✅ Allow if ADMIN
        if (user?.role === 'ADMIN') {
          return next();
        }
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const projectId = req.params.id;
        if (projectId) {
        
          // ✅ Check if this user has an assignment for this project
          const isOwner = await this.prisma.assignment.findFirst({
            where: {
              userId: userId,
              projectId: projectId,
            },
          });
          if (!isOwner) {
            return res
              .status(403)
              .json({ message: 'You are not the owner of this project' });
          }
        }

        // ✅ Allow if owner
        return next();
      } else {
        throw { message: 'Token is not available' };
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: error || { error: error.message } });
    }
  }
}
