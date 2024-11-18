import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable global validation pipe
    app.useGlobalPipes(new ValidationPipe());

    const corsOptions: CorsOptions = {
      origin: process.env.REACT_APP_URL || 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
  
    app.enableCors(corsOptions);
    
  await app.listen(4000);
}
bootstrap();
