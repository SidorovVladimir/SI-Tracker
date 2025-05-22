import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<string>('port', '5000');
  await app.listen(port);
}
bootstrap()
  .then(() => console.log('Started!'))
  .catch((err) => console.error('Error:', err));
