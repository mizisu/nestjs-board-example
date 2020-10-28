import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty({
        format: 'email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        format: 'alphanumeric',
    })
    @IsAlphanumeric()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}
