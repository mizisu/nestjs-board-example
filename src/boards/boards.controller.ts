import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
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
    async getAllKinds(): Promise<GetAllKindsDto[]> {
        return await this.boardsService.getAllKinds();
    }

    @ApiOperation({
        operationId: 'Get all boards',
    })
    @Get('/boards/')
    getAll() {
        return 'All movies';
    }
}
