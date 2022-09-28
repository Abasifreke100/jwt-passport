import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';
import { ExceptionFilter } from './common/utils/filter';
import { TimeoutInterceptor } from './common/utils/timeout';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // middlewares, express specific
  app.use(helmet());
  app.use(rateLimit({ windowMs: 60, max: 50 }));

  // filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  // interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // pipeline validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
