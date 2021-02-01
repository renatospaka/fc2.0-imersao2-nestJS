import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './models/product.model';
import { ProductController } from './controllers/product/product.controller';
import { CheckoutController } from './checkout/checkout.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Product]
    }),
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
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
      }
    ])
  ],
  controllers: [AppController, ProductController, CheckoutController],
  providers: [AppService],
})
export class AppModule {}
