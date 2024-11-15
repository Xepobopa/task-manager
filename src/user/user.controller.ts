import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { TokenExtractor } from 'src/global/middlware/decorator/token.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/tasks')
    async getTasks(@TokenExtractor() token: string) {
        return await this.userService.getTasksByUser(token);
    }   
}
