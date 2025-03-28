import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('buy')
    @UseGuards(AuthGuard('jwt'))
    async bid(@Body() param: any){
        const res = await this.orderService.placeOrder(param.userId, param)
        return res
    }

    @Post('sell')
    @UseGuards(AuthGuard('jwt'))
    async sell(@Body() param: any){
        console.log(param)
        const res = await this.orderService.placeOrder(param.userId, param)
        return res
    }

    @Post('cancel-order')
    @UseGuards(AuthGuard('jwt'))
    async cancelOrder(@Body() param: any){
        const res = await this.orderService.cancelOrder(param.userId, param.orderId)
        return res
    }

    @Get('search')
    @UseGuards(AuthGuard('jwt'))
    async getOrder(@Query() query: any){
        const res = await this.orderService.getOrder(query)
        return res
    }
    
}
