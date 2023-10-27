import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AddOn } from './addOn.schema';

export type FoodDocument = HydratedDocument<Food>;

@Schema()
export class Food {
  @Prop({ required: true })
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AddOn' }] }) // Reference to AddOn collection
  addOn: AddOn[];
}
