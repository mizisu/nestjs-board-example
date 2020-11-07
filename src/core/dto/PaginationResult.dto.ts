import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUrl } from 'class-validator';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

export class PaginationResultDto<T> {
    static async fromQuerybuilder<U extends BaseEntity>(
        queryBuilder: SelectQueryBuilder<U>,
        page: number,
        pageSize: number,
    ): Promise<PaginationResultDto<U>> {
        const skipSize = Math.abs(page - 1) * pageSize;
        const count = await queryBuilder.getCount();
        const data = await queryBuilder
            .offset(skipSize)
            .limit(pageSize)
            .getMany();

        return {
            count,
            previous: '',
            next: '',
            results: data,
        };
    }

    @ApiProperty()
    @IsNumber()
    count: number;

    @ApiProperty()
    @IsUrl()
    next: string;

    @ApiProperty()
    @IsUrl()
    previous: string;

    @ApiProperty()
    @IsArray()
    results: T[];
}
