import { IsNumber } from "class-validator";

export class CreateCartDto {

    @IsNumber()
    productId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    amount: number;

}
