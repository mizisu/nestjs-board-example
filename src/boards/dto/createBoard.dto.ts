import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
    @ApiProperty()
    @IsNumber()
    kindId: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsBoolean()
    revisit: boolean = false;
}
