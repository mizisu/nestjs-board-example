import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestApp } from './app.test';

beforeAll(() => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
});

describe('AppController (e2e)', () => {
    it('/api/v1/boards/ (GET)', () => {
        return request(TestApp.getHttpServer())
            .get('/boards/')
            .expect(200);
    });
});
