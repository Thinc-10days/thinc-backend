import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Point } from './point.schema';
import { Food } from './food.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  image: string;

  @Prop({ type: Point })
  position: Point;

  @Prop()
  food: Food[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ position: '2dsphere' });
