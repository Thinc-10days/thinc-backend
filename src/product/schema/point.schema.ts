import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Point {
  @Prop({ type: String, required: true, enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[];
}
