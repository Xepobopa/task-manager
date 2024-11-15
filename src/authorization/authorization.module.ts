import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
    imports: [
        UserModule,
        TokenModule,
    ],
    controllers: [AuthorizationController],
    providers: [AuthorizationService],
})
export class AuthorizationModule {}
