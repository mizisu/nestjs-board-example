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
import { PaginationQueryDto } from 'src/core/dto/PaginationQuery.dto';
import { BoardsService } from './boards.service';
import { GetAllKindsDto } from './dto/getAllKinds.dto';

@ApiTags('Boards')
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
    @Get('/boards/')
    async getAll(@Query() query: PaginationQueryDto) {
        return await this.boardsService.getAllBoards(query);
    }
}
