import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
    imports: [],
    controllers: [UsersController],
})
export class UsersModule {}
