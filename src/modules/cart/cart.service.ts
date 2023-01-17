import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { Repository } from 'typeorm';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class CartService {

  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}


  async create(createCartDto: CreateCartDto) : Promise<Cart>{
    //const productId = await this.findOne(createCartDto.productId);
    const product = this.repo.create(createCartDto);
    return this.repo.save(product);

  }

  async findAll(userId: number): Promise<Cart[]> {
    
      const user = await this.repo.find({ where: { userId },});
    
      console.log(user);
      
      if(!user.length){
        throw new NotFoundException('User not exist');
      }
      

      return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(productId: number, updateCartDto: UpdateCartDto) : Promise<UpdateCartDto>{
    const product = await this.repo.findOneBy({productId});
    if(!product)
            {
                throw new NotFoundException;
            }
            const user = Object.assign(product,updateCartDto);
            return this.repo.save(user)
  }




  async remove(productId: number) : Promise<Cart>{
    const pro = await this.repo.findOneBy({productId})
    if(!pro){
      throw new NotFoundException('product Not found');
    }
    return this.repo.remove(pro);
  }

}
