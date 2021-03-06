import { Injectable } from '@nestjs/common';
import { PaginationResultDto } from '../core/dto/paginationResult.dto';
import { User } from '..//users/entities/user.entity';
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

    public async createBoard(user: User, createBoardDto: CreateBoardDto) {
        const newBoard = Board.create({
            title: createBoardDto.title,
            content: createBoardDto.content,
            kind: await Kind.findOne(createBoardDto.kindId),
            user,
            revisit: createBoardDto.revisit,
        });
        newBoard.save();
        return newBoard;
    }
}
