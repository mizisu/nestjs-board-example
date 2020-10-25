import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
