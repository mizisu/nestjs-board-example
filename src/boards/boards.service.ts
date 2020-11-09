import { Injectable, Query } from '@nestjs/common';
import { create } from 'domain';
import { PaginationResultDto } from 'src/core/dto/paginationResult.dto';
import { CreateBoardDto } from './dto/createBoard.dto';
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
        page: number,
        pageSize: number,
    ): Promise<PaginationResultDto<GetAllBoardsDto>> {
        return PaginationResultDto.fromQuerybuilder(
            Board.createQueryBuilder().orderBy('id', 'DESC'),
            page,
            pageSize,
        );
    }

    public async createBoard(createBoardDto: CreateBoardDto) {
        return Board.create({
            title: createBoardDto.title,
            content: createBoardDto.content,
            kind: await Kind.findOne(createBoardDto.kindId),
            revisit: createBoardDto.revisit,
        });
    }
}
