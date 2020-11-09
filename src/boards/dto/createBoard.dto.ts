import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @ApiProperty()
    kindId: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    revisit: boolean;
}
