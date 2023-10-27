import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from 'mongoose'
import { Point } from "src/product/schema/point.schema";
import { Item } from "./item.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({ type: Types.ObjectId })
    eater: Types.ObjectId;

    @Prop({ type: Types.ObjectId })
    picker?: Types.ObjectId;

    @Prop({ type: Types.ObjectId })
    restaurant: Types.ObjectId;

    @Prop({type: String ,enum: ['pending', 'confirmed','cooking','delivering', 'completed', 'cancelled'], default: 'pending'})
    status: string;

    @Prop({ type: Item })
    items: Item[];

    @Prop()
    fee: number;

    @Prop({ type: Point})
    source: Point

    @Prop({ type: Point})
    destination: Point

    @Prop()
    orderTime: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);