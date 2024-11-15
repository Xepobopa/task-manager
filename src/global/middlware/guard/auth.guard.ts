import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(TokenService) private readonly tokenService: TokenService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);

        if (!token) {
            throw new UnauthorizedException("Token in headers not found!");
        }

        // verify function check if token verified or throw new UnauthorizedException();
        request['user'] = this.tokenService.verifyToken(token, 'access');

        return true;
    }

    private extractTokenFromRequest(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}