import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar opciones de CORS
  const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:54118', // Reemplaza con el origen de tu aplicación Flutter
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.use(cors(corsOptions));

  await app.listen(3000);
}

bootstrap();
