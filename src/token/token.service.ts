import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public generateTokens(payload: object) {

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_ACCESS'),
            expiresIn: '10m',
            algorithm: 'HS256',
            allowInvalidAsymmetricKeyTypes: false,
            allowInsecureKeySizes: false,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET_REFRESH'),
            expiresIn: '3d',
            algorithm: 'HS256',
            allowInvalidAsymmetricKeyTypes: false,
            allowInsecureKeySizes: false,
        });

        return { accessToken, refreshToken };
    }

    public verifyToken(token: string, tokenType: 'access' | 'refresh') {
        try {
            return this.jwtService.verify(token, {
                secret:
                    tokenType === 'access'
                        ? this.configService.get<string>('SECRET_ACCESS')
                        : this.configService.get<string>('SECRET_REFRESH'),
                ignoreExpiration: false,
                algorithms: ['HS256'],
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
