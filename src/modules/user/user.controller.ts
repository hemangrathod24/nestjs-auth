import { Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  BadRequestException,
  UseGuards,
  Request,
  HttpStatus,
  Res
  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import {Response} from 'express';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/create')
  create(@Body() body: CreateUserDto) {
    try {
      return this.authService.createUser(body);
    } catch (err) {
      throw new BadRequestException('Error');
    }
  }

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body.userName, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Get(':userName')
  // find(@Param('userName') userName: string) {
  //   return this.userService.find(userName);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('change')
  async reset(
      @Request() req,   // access to the current logedIn token
      @Res() res: Response,
      @Body() changePasswordDto: ChangePasswordDto
  ): Promise<void> {
      const data = await this.authService.changePassword(req.user.userId, changePasswordDto)

      console.log(data, `change successfully `);
      
      res.status(HttpStatus.OK).send({
          success: HttpStatus.OK,
          data,
          message: "Password changed successfully",
      });
  }

}
