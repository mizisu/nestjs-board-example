import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiPaginatedDto } from 'src/core/decorator/paginationResponse';
import { PaginationResultDto } from 'src/core/dto/paginationResult.dto';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { GetAllBoardsDto } from './dto/getAllBoards.dto';
import { GetAllKindsDto } from './dto/getAllKinds.dto';

@ApiTags('Boards')
@ApiExtraModels(PaginationResultDto, GetAllBoardsDto)
@Controller()
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @ApiOperation({
        operationId: 'Get all kinds',
    })
    @ApiResponse({ status: 200, type: [GetAllKindsDto] })
    @Get('boards/kinds/')
    async getAllKinds() {
        return await this.boardsService.getAllKinds();
    }

    @ApiOperation({
        operationId: 'Get all boards',
    })
    @ApiPaginatedDto(GetAllBoardsDto)
    @Get('/boards/')
    async getAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ): Promise<PaginationResultDto<GetAllBoardsDto>> {
        return await this.boardsService.getAllBoards(page, pageSize);
    }

    @ApiOperation({
        operationId: 'Create boards',
    })
    @UseGuards(JwtAuthGuard)
    @Post('/boards/')
    async createBoard(@Request() req, @Body() body: CreateBoardDto) {
        return await this.boardsService.createBoard(req.user, body);
    }
}
