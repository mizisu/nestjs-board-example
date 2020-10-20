import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/entities/board.entity';
import { Kind } from './boards/entities/kind.entity';
import { User } from './users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'sqlite3.db',
            entities: [User, Board, Kind],
            synchronize: true,
            logging: true,
        }),
        BoardsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
