import { IsEmail, IsString } from "class-validator";
import { AbstarctDto } from "src/global/dto/abstarct.dto";
import { TaskDto } from "src/task/dto/task.dto";

export class UserDto extends AbstarctDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    tasks: TaskDto
}