import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schema/shop.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
