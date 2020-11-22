import { assert } from 'console';
import request from 'supertest';
import { TestApp } from './app.test';

describe('AuthController (e2e)', () => {
    it('/api/v1/auth/sign-in/ (POST)', () => {
        return request(TestApp.getHttpServer())
            .post('/api/v1/auth/sign-in/')
            .send({
                email: 'test@email.com',
                username: 'testxcvvw',
                password: 'test1234',
            })
            .expect(201);
    });

    it('/api/v1/auth/login/ (POST)', () => {
        return request(TestApp.getHttpServer())
            .post('/api/v1/auth/login/')
            .send({
                username: 'testxcvvw',
                password: 'test1234',
            })
            .expect(res => {
                assert(res.status === 201);
                assert(res.body.hasOwnProperty('access'));
            });
    });
});
