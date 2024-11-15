import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseUserSchemas } from 'src/global/config/schemas/auth.schema';
import { TokenModule } from 'src/token/token.module';

@Module({
    imports: [
        MongooseModule.forFeature(mongooseUserSchemas),
        TokenModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
