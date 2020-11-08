import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
    @ApiProperty()
    kind: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}
