import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAdmin, setupApi, setupSwagger } from './setup';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await setupApi(app);
    await setupSwagger(app);
    await setupAdmin(app);
    app.enableCors();
    await app.listen(8000);
}
bootstrap();
