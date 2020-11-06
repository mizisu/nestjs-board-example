import { ApiProperty } from '@nestjs/swagger';
import { PaginationResultDto } from 'src/core/dto/PaginationResult.dto';

class GetAllBoardsDtoItem {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;
}

export class GetAllBoardsDto extends PaginationResultDto<GetAllBoardsDtoItem> {}
