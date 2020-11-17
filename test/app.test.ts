import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setupApi } from '../src/setup';
import { AppModule, getTypeOrmModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { BoardsModule } from '../src/boards/boards.module';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { unlinkSync } from 'fs';

export let TestApp: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            getTypeOrmModule('sqlite3.test.db'),
            BoardsModule,
            UsersModule,
            AuthModule,
        ],
        controllers: [],
        providers: [],
    })
        .overrideGuard(JwtAuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

    TestApp = moduleFixture.createNestApplication();
    await setupApi(TestApp);
    await TestApp.init();
});
