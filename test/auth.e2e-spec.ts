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
});
