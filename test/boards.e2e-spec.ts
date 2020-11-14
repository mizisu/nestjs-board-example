import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestApp } from './app.test';

describe('AppController (e2e)', () => {
    // it('/api/v1/boards/ (POST)', () => {
    //     return request(TestApp.getHttpServer())
    //         .get('api/v1/boards/')
    //         .expect(200);
    // });

    it('/api/v1/boards/ (GET)', () => {
        return request(TestApp.getHttpServer())
            .get('api/v1/boards/')
            .expect(200);
    });
});
