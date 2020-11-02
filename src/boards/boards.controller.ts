import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { GetAllKindsDto } from './dto/getAllKinds.dto';
import { GetAllBoardsQueryDto } from './dto/getAllBoardQeury.dto';

@ApiTags('Boards')
@Controller()
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @ApiOperation({
        operationId: 'Get all kinds',
    })
    @ApiResponse({ status: 200, type: [GetAllKindsDto] })
    @Get('boards/kinds/')
    async getAllKinds(): Promise<GetAllKindsDto[]> {
        return await this.boardsService.getAllKinds();
    }

    @ApiOperation({
        operationId: 'Get all boards',
    })
    @Get('/boards/')
    async getAll(@Query() query: GetAllBoardsQueryDto) {
        return await this.boardsService.getAllBoards(
            query.page,
            query.pageSize,
        );
    }
}
