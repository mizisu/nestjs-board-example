import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Food board')
        .setDescription('The Food board API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    const redocOptions: RedocOptions = {
        title: 'Food board API',
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

    await app.listen(3000);
}
bootstrap();
