import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModelNotFoundExceptionFilter } from './exceptionFilters/modelNotFound.exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ModelNotFoundExceptionFilter())
  await app.listen(3000);
}
bootstrap();
