import { Prop, Schema } from "@nestjs/mongoose";
import { AddOn } from "./addOn.schema";

@Schema()
export class Item {
    @Prop()
    name: string;

    @Prop()
    notes: string

    @Prop({ type: AddOn})
    addOn: AddOn[]

    @Prop()
    price: number;
}