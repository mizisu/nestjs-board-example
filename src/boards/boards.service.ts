import { Injectable, Query } from '@nestjs/common';
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
    ): Promise<GetAllBoardsDto[]> {
        console.log(page, pageSize);

        const skipSize = Math.abs(page - 1) * pageSize;

        return await Board.createQueryBuilder()
            .orderBy('id', 'DESC')
            .offset(skipSize)
            .take(pageSize)
            .getMany();
    }
}
