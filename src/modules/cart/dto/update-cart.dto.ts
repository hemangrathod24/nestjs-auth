import { CreateCartDto } from './create-cart.dto';
import { IsNumber, IsOptional } from 'class-validator';


export class UpdateCartDto  {

    @IsOptional()
    @IsNumber()
    quantity: number;   

    @IsOptional()
    @IsNumber()
    amount: number;
}
 