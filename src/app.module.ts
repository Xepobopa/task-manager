import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { MongoConfigAsync } from './global/config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync(MongoConfigAsync),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                PORT: Joi.number().required().port().default(5000),
                DB_CONNECTION: Joi.string().required(),
                COOKIE_SECRET: Joi.string().required(),
                ACCESS_TOKEN: Joi.string().required(),
                REFRESH_TOKEN: Joi.string().required(),
            }),
        }),
        AuthorizationModule,
        TokenModule,
        TaskModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
