import { IsEnum, IsString } from "class-validator";
import { AbstarctDto } from "src/global/dto/abstarct.dto";
import { TaskStatus } from "src/global/enum/task-status.enum";
import { User } from "src/global/schema/user.schema";

export class TaskDto extends AbstarctDto {
    @IsString()
    title: string;

    @IsString()
    desc: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;

    user: User;
}