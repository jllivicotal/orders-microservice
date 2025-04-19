import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    
  ) {}

  @MessagePattern('create_order')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
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
}
