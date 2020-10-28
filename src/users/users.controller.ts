import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../auth/dto/login.dto';
import { SignInDto } from '../auth/dto/signIn.dto';
import { UsersService } from './users.services';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService) {}
}
