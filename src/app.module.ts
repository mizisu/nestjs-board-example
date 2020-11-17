import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/entities/board.entity';
import { Kind } from './boards/entities/kind.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ApiExtraModels } from '@nestjs/swagger';
import { PaginationResultDto } from './core/dto/paginationResult.dto';

export function getTypeOrmModule(db) {
    return TypeOrmModule.forRoot({
        type: 'sqlite',
        database: db,
        entities: [User, Board, Kind],
        synchronize: true,
        logging: true,
        keepConnectionAlive: true,
    });
}

@Module({
    imports: [
        getTypeOrmModule('sqlite3.db'),
        BoardsModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
