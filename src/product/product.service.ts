import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from './schema/shop.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

  async getShop(): Promise<Shop[]> {
    return this.shopModel.find().exec();
  }

  async getById(id: string): Promise<Shop> {
    if (!ObjectId.isValid(id)) throw new BadRequestException();
    return this.shopModel.findOne(new ObjectId(id));
  }
}
