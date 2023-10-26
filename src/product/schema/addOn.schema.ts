import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<AddOn>;

@Schema()
export class AddOn {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, required: true, enum: ['radio', 'checkBox'] })
  type: string;

  @Prop()
  options: string[];
}
