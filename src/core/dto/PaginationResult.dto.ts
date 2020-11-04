import { IsArray, IsNumber, IsUrl } from 'class-validator';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import { PaginationQueryDto } from './PaginationQuery.dto';

export class PaginationResultDto<T> {
    static async fromQuerybuilder<U extends BaseEntity>(
        queryBuilder: SelectQueryBuilder<U>,
        query: PaginationQueryDto,
    ): Promise<PaginationResultDto<U>> {
        const skipSize = Math.abs(query.page - 1) * query.pageSize;
        const count = await queryBuilder.getCount();
        const boards = await queryBuilder
            .offset(skipSize)
            .limit(query.pageSize)
            .getMany();

        return {
            count,
            previous: '',
            next: '',
            results: boards,
        };
    }

    @IsNumber()
    count: number;

    @IsUrl()
    next: string;

    @IsUrl()
    previous: string;

    @IsArray()
    results: T[];
}
