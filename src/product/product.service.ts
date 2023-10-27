import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private shopModel: Model<Product>) {}

  async getShop(): Promise<Product[]> {
    return this.shopModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    if (!ObjectId.isValid(id)) throw new BadRequestException();
    return this.shopModel.findOne(new ObjectId(id));
  }

  async getByName(name: string): Promise<Product[]> {
    return this.shopModel.findOne({ name: name });
  }

  async findByDistance(
    lat: number,
    long: number,
    distance: number,
  ): Promise<Product[]> {
    return this.shopModel.find({
      position: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
          $maxDistance: distance,
        },
      },
    });
  }

  async findByPrice(max?: number, min?: number): Promise<Product[]> {
    if (max && min) {
      return this.shopModel.find({
        price: {
          $gte: min,
          $lte: max,
        },
      });
    } else if (max) {
      return this.shopModel.find({
        price: {
          $lte: max,
        },
      });
    } else if (min) {
      return this.shopModel.find({
        price: {
          $gte: min,
        },
      });
    } else {
      throw new BadRequestException();
    }
  }
}
