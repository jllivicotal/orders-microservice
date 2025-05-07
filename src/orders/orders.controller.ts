import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { PaidOrderDto } from './dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    
  ) {}

  @MessagePattern('create_order')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    const paymentSession = await this.ordersService.createPaymentSession(order);
    return {
      order,
      paymentSession,
    };
  }

  @MessagePattern('find_all_orders')
  findAll(
    @Payload() orderStatusDto: OrderPaginationDto,
  ) {
    return this.ordersService.findAll(orderStatusDto);
  }

  @MessagePattern('find_one_order')
  findOne(@Payload('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('change_order_status')
  changeOrderStatus(
    @Payload() changeOrderStatusDto: ChangeOrderStatusDto,
  ){
    return this.ordersService.changeOrderStatus(changeOrderStatusDto);
  }

  @EventPattern('payment.succeeded')
  paidOrder(@Payload() paidOrderDto: PaidOrderDto) {
    return this.ordersService.paidOrder(paidOrderDto);

  }
}
