import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/global/schema/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
	constructor(
		@InjectModel(Task.name) private taskModel: Model<Task>,
		private readonly tokenService: TokenService,
		private readonly userService: UserService
	) {}

	async create(newTask: CreateTaskDto, token: string) {
		const userId = this.tokenService.verifyToken(token, 'access')._id;
		const user = await this.userService.findOne({ _id: userId });

		if (!user) {
			throw new UnauthorizedException("User not found!");
		}

		const createdTask = await this.taskModel.create({ ...newTask, user: user._id });
		user.tasks.push(createdTask._id as any);
		await user.save();

		return createdTask;
	}

	async findOne(id: string, token: string) {
		const userId = this.tokenService.verifyToken(token, 'access')._id;
		const task = await this.taskModel.findById(id).populate('user').exec();

		if (!task)
			throw new BadRequestException("Task with provided id not found!")
		
		if (task.user._id != userId)
			throw new BadRequestException("You are not the owner of this task!")

		return task;
	}

	async update(updateTask: UpdateTaskDto, id: string, token: string) {
		// throw error if task does not exists or user is not owner
		const task = await this.findOne(id, token);

		await this.taskModel.updateOne({ _id: task._id }, updateTask).exec();
	}

	async remove(id: string, token: string) {
		await this.taskModel.deleteOne({ _id: id });

		const userId = this.tokenService.verifyToken(token, 'access')._id;
		const user = await this.userService.findOne({ _id: userId });
		user.tasks = user.tasks.filter(task => task._id.toString() != id);

		await user.save();
	}
}
