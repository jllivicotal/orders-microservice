import { IsEnum, IsUUID } from "class-validator";
import { OrderStatusList } from "../enum";
import { OrderStatus } from "@prisma/client";

export class ChangeOrderStatusDto {

  @IsUUID(4)
  id: string;

  @IsEnum(OrderStatusList, {
    message: `status must be one of the following values: ${OrderStatusList}`
  })
  status: OrderStatus;

};