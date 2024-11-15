import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery } from 'mongoose';
import { User } from 'src/global/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        public readonly tokenService: TokenService,
    ) {}

    public async create(newUser: CreateUserDto) {
        return await this.userModel.create({
            ...newUser,
            password: await hash(newUser.password, 10)
        })
    }

    public async findOne(filter: RootFilterQuery<User>) {
        return await this.userModel.findOne(filter);
    }

    public async getTasksByUser(token: string) {
        const userId = this.tokenService.verifyToken(token, 'access');

        return (await this.userModel.findById(userId).populate({ path: 'tasks', model: 'Task' }).exec()).tasks;
    }
}
