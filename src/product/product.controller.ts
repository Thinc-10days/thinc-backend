import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Product } from './schema/product.schema';
import { FindByPriceDto } from './dto/findByPrice.dto';
import { findByDistanceDto } from './dto/findByDistance.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // async create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.getShop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() id: string): Promise<Product> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.productService.getById(id);
    }
    throw new BadRequestException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.getByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post('distance')
  async findByDistance(@Body() body: findByDistanceDto): Promise<Product[]> {
    console.log(JSON.stringify(body));
    return this.productService.findByDistance(
      body.lat,
      body.long,
      body.distance,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('price')
  async findByPrice(@Body() body: FindByPriceDto): Promise<Product[]> {
    return this.productService.findByPrice(body.max, body.min);
  }
}
