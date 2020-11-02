import { ApiProperty } from '@nestjs/swagger';

export class GetAllBoardsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}
