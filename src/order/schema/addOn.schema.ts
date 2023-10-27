import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class AddOn {
    @Prop()
    title: string;

    @Prop()
    price: number
}