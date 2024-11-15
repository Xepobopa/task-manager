import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TokenExtractor } from 'src/global/middlware/decorator/token.decorator';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create( @Body() newTask: CreateTaskDto, @TokenExtractor() token: string) {
        return this.taskService.create(newTask, token);
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(+id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    //     return this.taskService.update(+id, updateTaskDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(+id);
    }

    private getAccessToken() {

    }
}
