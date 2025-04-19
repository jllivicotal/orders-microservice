import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from './config';

@Module({
  imports: [
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
