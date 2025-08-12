import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
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
        
        if (user?.role === 'ADMIN') {
         
          next();
        } else {
          throw new Error('You are not admin!');

        }
      } else {
        throw { message: 'Token is not available' };
      }
    } catch (error) {
      console.log(error)
      return res
        .status(401)
        .json({ message: error || { error: error.message } });
    }
  }
}
