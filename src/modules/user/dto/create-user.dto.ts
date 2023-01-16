import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsNumber()
    id: number;

    @IsString()
    firstname: string;
    
    @IsString()
    lastname: string
    
    @IsString()
    userName: string
    
    @IsString()
    password: string

}
