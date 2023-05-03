import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigGlobais } from './config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://produto.queavanca.com',
    credentials: true,
  });

  await app.listen(ConfigGlobais.ENV_PORT);
}
bootstrap();
