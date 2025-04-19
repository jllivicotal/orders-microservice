import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "./pagination.dto";
import { OrderStatusList } from "../enum";
import { OrderStatus } from "@prisma/client";

export class OrderPaginationDto extends PaginationDto {

  @IsOptional()
  @IsEnum( OrderStatusList, {
    message: `Status must be one of the following values: ${OrderStatusList}`,
  })
  status?: OrderStatus;

};