import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
import { JwtUtil } from 'src/common/jwtUtil';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService, private readonly jwtUtil : JwtUtil) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAllOrder(): Promise<Order[]> {
        return this.orderService.getAllOrder();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Body() order: Order): Promise<Order> {
        return this.orderService.createOrder(order);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user/:userId')
    async getOrderByUser(@Param('userId') userId: string): Promise<Order[]> {
        return this.orderService.getOrderByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update-status')
    async updateStatus(@Body() body: {id: string, status: string},@Req() req): Promise<Order> {
        const user = this.jwtUtil.decode(req.headers.authorization);
        console.log(JSON.stringify(user))
        return this.orderService.updateStatus(body.id, body.status, user.id);
    }
}
