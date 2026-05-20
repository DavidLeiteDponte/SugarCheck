import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// 1. Instanciamos un servidor Express nativo fuera del flujo estándar
const server = express();

async function bootstrap() {
  // 2. Le pasamos el servidor express a NestJS usando el ExpressAdapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.use(cookieParser());
  app.enableCors();
  
  // 3. Súper importante: Inicializamos la app de Nest sin levantar el puerto todavía
  await app.init();
}

// Ejecutamos la inicialización interna de los módulos de NestJS
bootstrap();

// 4. Exportamos el servidor Express. Vercel lo capturará automáticamente a través de tu vercel.json
export default server;