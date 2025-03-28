import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { CancelOrderDto, PlaceOrderDto, SearchQuery } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('buy')
  @UseGuards(AuthGuard('jwt'))
  async bid(@Body() placeOrderDto: PlaceOrderDto) {
    const res = await this.orderService.placeOrder(
      placeOrderDto.userId,
      placeOrderDto,
    );
    return res;
  }

  @Post('sell')
  @UseGuards(AuthGuard('jwt'))
  async sell(@Body() placeOrderDto: PlaceOrderDto) {
    const res = await this.orderService.placeOrder(
      placeOrderDto.userId,
      placeOrderDto,
    );
    return res;
  }

  @Post('cancel-order')
  @UseGuards(AuthGuard('jwt'))
  async cancelOrder(@Body() cancelOrderParam: CancelOrderDto) {
    const res = await this.orderService.cancelOrder(cancelOrderParam);
    return res;
  }

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
  async getOrder(@Query() query: SearchQuery) {
    const res = await this.orderService.getOrder(query);
    return res;
  }
}
