import { ApiProperty } from "@nestjs/swagger";
export class LoginUserDto{
    @ApiProperty({ example: 'user@gmail.com' })
    email:string;
    @ApiProperty({ example: 'bnm' })
    password:string;
}