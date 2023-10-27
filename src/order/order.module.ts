import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { JwtUtil } from 'src/common/jwtUtil';
import { OrderGateway } from './order.gateway';

@Module({
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}])],
  providers: [OrderService, JwtUtil, OrderGateway],
  controllers: [OrderController]
})
export class OrderModule {}
