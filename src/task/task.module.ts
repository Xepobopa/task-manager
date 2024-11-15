import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { mongooseTaskSchemas } from 'src/global/config/schemas/task.schema';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
    imports: [
        MongooseModule.forFeature(mongooseTaskSchemas),
        TokenModule,
        UserModule,
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
