import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto, hashPassword: string) : Promise<User>{
    const user = this.userRepository.create({...createUserDto, password:hashPassword});
    return this.userRepository.save(user);
  }

  
  async findByUserName(userName: string) {
    return await this.userRepository.findOneBy({ userName });
   }


  findAll() {
    return `This action returns all user`;
  }

  findOneBy(id: number) {
    return this.userRepository.findOneBy({id})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updatePassword(data:any){
    return this.userRepository.createQueryBuilder()
    .update(User)
    .set({password:data})
   //  .where("id = :id", { id: id })
    .execute();
 }

}                           
