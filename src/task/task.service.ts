import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/global/schema/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(Task.name) private taskModel: Model<Task>,
		private readonly tokenService: TokenService,
		private readonly userService: UserService
	) {}

	create(newTask: CreateTaskDto, token: string) {
		const userId = this.tokenService.verifyToken(token, 'access')._id;
		const user = this.userService.findOne({ _id: userId });

		if (!user) {
			throw new UnauthorizedException("User not found!");
		}

		this.taskModel.create({
			...newTask,
			user: user
		});
	}

	findAll() {
		return `This action returns all task`;
	}

	findOne(id: number) {
		return `This action returns a #${id} task`;
	}

	update(id: number) {
		return `This action updates a #${id} task`;
	}

	remove(id: number) {
		return `This action removes a #${id} task`;
	}
}
