import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllBoardsQueryDto {
    @Transform(id => (id ? parseInt(id, 10) : id))
    @IsNumber()
    page?: number = 0;

    @Transform(id => (id ? parseInt(id, 10) : id))
    @IsNumber()
    @IsOptional()
    pageSize?: number = 15;
}
