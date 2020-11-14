import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { setupApi } from '../src/setup';
import { AppModule } from '../src/app.module';

export let TestApp: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    TestApp = moduleFixture.createNestApplication();
    await setupApi(TestApp);
    await TestApp.init();
});
