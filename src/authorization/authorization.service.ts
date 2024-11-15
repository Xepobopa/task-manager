import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthorizationService {
    constructor(
        private readonly userService: UserService,
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

        return user;
    }

    findOne(id: number) {
        return `This action returns a #${id} authorization`;
    }

    remove(id: number) {
        return `This action removes a #${id} authorization`;
    }
}
