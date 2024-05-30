import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigGlobais } from './config';
import { loggerMiddleare } from './middleware/logger.middleware';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //logger: new MyLoggerService(),
    cors: {
      origin: [
        'https://images.queavanca.com',
        'https://api-gateway.queavanca.com'
      ],
      credentials: true,
    }
  })


  app.use(loggerMiddleare);

  await app.listen(ConfigGlobais.ENV_PORT);
}
bootstrap();
