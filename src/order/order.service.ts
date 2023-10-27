import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async getAllOrder(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async createOrder(order: Order): Promise<OrderDocument> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async getOrderByUser(userId: string): Promise<Order[]> {
    if (!ObjectId.isValid(userId)) throw new BadRequestException();
    return this.orderModel.find({ eater: userId });
  }

  async updateStatus(
    id: string,
    status: string,
    userId: string,
  ): Promise<Order> {
    if (!ObjectId.isValid(id)) throw new BadRequestException();

    const order = await this.orderModel.findById(new ObjectId(id));
    if (!order) throw new BadRequestException();
    console.log(userId);
    console.log(order.picker.toString());
    console.log(order.eater.toString());

    if (
      order.picker.toString() !== userId &&
      order.eater.toString() !== userId
    ) {
      throw new BadRequestException(
        'You are not authorized to update this order',
      );
    }

    return this.orderModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: false },
    );
  }
}
