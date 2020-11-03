import { IsArray, IsNumber, IsUrl } from 'class-validator';

export class PaginationResultDto<T> {
    @IsNumber()
    count: number;

    @IsNumber()
    page: number;

    @IsUrl()
    next: string;

    @IsArray()
    results: T[];
}
