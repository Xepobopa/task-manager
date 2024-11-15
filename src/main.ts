import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            credentials: true,
            origin: ['http://localhost:3000', 'https://primaflora.store']
        },
    });

    const config = app.get<ConfigService>(ConfigService);

    app.use(cookieParser(config.get<string>('COOKIE_SECRET')));
    app.useGlobalPipes(new ValidationPipe());

    const server = await app.listen(config.get<number>('PORT'), () =>
        console.log(`Host on http://localhost:${config.get<number>('PORT')}`)
    );

    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
    .map((layer: any) => {
        if (layer.route) {
            return {
                route: {
                    path: layer.route?.path,
                    method: layer.route?.stack[0].method,
                },
            };
        }
    })
    .filter((item: any) => item !== undefined);
    console.log(availableRoutes);
}
bootstrap();
