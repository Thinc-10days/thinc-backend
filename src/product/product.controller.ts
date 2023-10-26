import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Shop } from './schema/shop.schema';
import mongoose from 'mongoose';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // async create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get()
  async findAll(): Promise<Shop[]> {
    return this.productService.getShop();
  }

  @Get(':id')
  async findOne(@Param() id: string): Promise<Shop> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.productService.getById(id);
    }
    throw new BadRequestException();
  }
}
