import { Injectable, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/core/dto/PaginationQuery.dto';
import { PaginationResultDto } from 'src/core/dto/PaginationResult.dto';
import { GetAllBoardsDto } from './dto/getAllBoards.dto';
import { GetAllKindsDto } from './dto/getAllKinds.dto';
import { Board } from './entities/board.entity';
import { Kind } from './entities/kind.entity';

@Injectable()
export class BoardsService {
    public async getAllKinds(): Promise<GetAllKindsDto[]> {
        return await Kind.find();
    }

    public async getAllBoards(
        paginationDto: PaginationQueryDto,
    ): Promise<PaginationResultDto<GetAllBoardsDto>> {
        const skipSize =
            Math.abs(paginationDto.page - 1) * paginationDto.pageSize;

        const count = await Board.count();
        const boards = await Board.createQueryBuilder()
            .orderBy('id', 'DESC')
            .offset(skipSize)
            .take(paginationDto.pageSize)
            .getMany();

        return {
            count,
            page: paginationDto.page,
            next: '',
            results: boards,
        };
    }
}
