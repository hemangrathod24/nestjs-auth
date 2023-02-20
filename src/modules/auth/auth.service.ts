import * as bcrypt from "bcrypt";
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { ChangePasswordDto } from "../user/dto/change-password.dto";


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
      ) {}



      async createUser(body: CreateUserDto) {
        const users = await this.userService.findByUserName(body.userName);
        if (users) {
          throw new BadRequestException('Sorry :)Already Email In Use ');
        }
        const saltOrRounds = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(body.password, saltOrRounds);
    
        const user = await this.userService.create(body, bcryptPassword);
        return user;
      }
    

      async login(userName: string, password: string) {
        const user = await this.userService.findByUserName(userName);
    
        if (!user) {
          throw new NotFoundException('user not found');
        }
    
        const hash = await bcrypt.compare(password, user.password);
        if (!hash) {
          throw new BadRequestException('Bad Password');
        }

        const payload = { username: user.userName, userId: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
        
      } 
       
      async changePassword(userId: number, body: ChangePasswordDto){

        const user = await this.userService.findOneBy(userId);

        if(user){
          const isMatch = await bcrypt.compare(body.old_password, user.password);

          if(isMatch){
            const saltOrRounds = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(body.new_password, saltOrRounds);
            const updatePassword = await this.userService.updatePassword(hashPassword);

            if (updatePassword) {
              return true
            } else {
              throw new HttpException('Error While resetting password', HttpStatus.BAD_REQUEST)
            }
          } else {
            throw new HttpException('You Entered a wrong password', HttpStatus.BAD_REQUEST)
          }

          }
        }
          

      }


       
      // practiced implementing typeorm relation oneToMany and ManyToOne.