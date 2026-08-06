import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // API Prefix
  app.setGlobalPrefix('api');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('IQRA VISTA API')
    .setDescription('AI-Powered Personalized Quran Learning Platform API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Students', 'Student management')
    .addTag('Assessments', 'AI Assessment system')
    .addTag('Lessons', 'Quran lessons & content')
    .addTag('Progress', 'Learning progress tracking')
    .addTag('AI Agents', 'AI agent interactions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  console.log(`🚀 IQRA VISTA API running on port ${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
