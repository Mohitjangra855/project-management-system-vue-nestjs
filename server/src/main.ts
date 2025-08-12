import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080', // yahan tumhare Vue app ka URL hoga
    credentials: true, // agar tum axios me withCredentials use kar rahe ho
  });
  app.setGlobalPrefix('api'); // yahan tum global prefix set kar rahe ho
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Project API')
    .setDescription('The API for your Project Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Middleware for parsing cookies and text bodies
  app.use(cookieParser());
  app.use(bodyParser.text({ type: 'text/plain' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
