import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number) : Promise<Cart[]> {
    return this.cartService.findAll(userId);
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':productId')
  async update(@Param('productId') productId: number, @Body() body: UpdateCartDto) : Promise<UpdateCartDto> {
   return this.cartService.update(productId, body);
  }

  @Delete(':productId')
  remove(@Param('productId') productId: number) : Promise<Cart>{
    return this.cartService.remove(productId);
  }
}
