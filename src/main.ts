import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigGlobais } from './config';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //logger: new MyLoggerService(),
    cors: {
      origin: 'https://produto.queavanca.com',
      credentials: false,
    }
  })


  await app.listen(ConfigGlobais.ENV_PORT);
}
bootstrap();
