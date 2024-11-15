import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TokenExtractor } from 'src/global/middlware/decorator/token.decorator';
import { AuthGuard } from 'src/global/middlware/guard/auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() newTask: CreateTaskDto, @TokenExtractor() token: string) {
        return this.taskService.create(newTask, token);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @TokenExtractor() token: string) {
        return await this.taskService.findOne(id, token);
    }

    @Patch(':id')
    async update(@Body() updateTask: UpdateTaskDto, @Param('id') id: string, @TokenExtractor() token: string) {
        return await this.taskService.update(updateTask, id, token);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @TokenExtractor() token: string) {
        return this.taskService.remove(id, token);
    }
}
