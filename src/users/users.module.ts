import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.services';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
