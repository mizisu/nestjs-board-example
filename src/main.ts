import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AdminBro from 'admin-bro';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { AppModule } from './app.module';
import * as AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';
import { User } from './users/entities/user.entity';
import { Kind } from './boards/entities/kind.entity';
import { Board } from './boards/entities/board.entity';

async function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Food board')
        .setDescription('The Food board API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    const redocOptions: RedocOptions = {
        title: 'Board API',
        logo: {
            url: 'https://redocly.github.io/redoc/petstore-logo.png',
            backgroundColor: '#F0F0F0',
            altText: 'Logo',
        },
        sortPropsAlphabetically: true,
        hideDownloadButton: true,
        hideHostname: false,
    };
    // Instead of using SwaggerModule.setup() you call this module
    await RedocModule.setup('/api/v1/docs/', app, document, redocOptions);
}

async function setupAdmin(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // Setup admin
    AdminBro.registerAdapter({ Database, Resource });

    const adminBro = new AdminBro({
        rootPath: '/admin',
        resources: [
            { resource: User },
            { resource: Board },
            { resource: Kind },
        ],
        branding: {
            companyName: 'Board',
        },
    });
    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api/v1');
    await setupSwagger(app);
    await setupAdmin(app);
    await app.listen(8000);
}
bootstrap();
