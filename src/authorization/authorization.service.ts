import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    public async signUp(signUpDto: SignUpDto) {
        const newUser = await this.userService.create(signUpDto);
        console.log(newUser);

        return newUser;
    }

    public async signIn(signInDto: SignInDto) {
        const user = await this.userService.findOne({ email: signInDto.email });
        if (!user) 
            throw new BadRequestException("Unable to login!", { 
                cause: "User or Password are incorrect!",
                description: "User or Password are incorrect!"
            });

        if (!(await compare(signInDto.password, user.password))) {
            throw new BadRequestException('Password is wrong!', {
                cause: 'Password is wrong!',
                description: 'Password is wrong!',
            });
        }

        const tokens = this.tokenService.generateTokens({ _id: user._id });

        return { user, tokens };
    }

    public async refreshToken(token: string) {
        const tokenPayload = this.tokenService.verifyToken(token, 'refresh');
        if (!tokenPayload)
            throw new UnauthorizedException("Refresh token expired. Please, relogin!");

        // get user._id from refresh token, fetch new data and generate new tokens
        const user = await this.userService.findOne({ _id: tokenPayload._id });
        const tokens = await this.tokenService.generateTokens({ _id: user._id }); // in this case we put just old id in new tokens, 
                                                                                  // but in big projects generally provides some other data like user role in tokens
        return { user, tokens };
    }

    remove(id: number) {
        return `This action removes a #${id} authorization`;
    }
}
