import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ModelNotFoundExceptionFilter } from './exceptionFilters/modelNotFound.exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true });
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['host.docker.internal:9094']
      },
      consumer: {
        //em desenvolvimento, a função Math.random() acelera a recriação dos grupos no Kafka
        groupId: 'my-consumer-'+Math.random()
      }
    }
  })
  app.useGlobalFilters(new ModelNotFoundExceptionFilter())
  await app.startAllMicroservicesAsync()
  await app.listen(3000);
}
bootstrap();
