import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Point } from './point.schema';
import { Food } from './food.schema';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop {
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

export const ShopSchema = SchemaFactory.createForClass(Shop);

ShopSchema.index({ position: '2dsphere' });
