import { OmitType, PartialType } from "@nestjs/mapped-types";
import { TaskDto } from "./task.dto";

export class UpdateTaskDto extends PartialType(OmitType(TaskDto,  ['user', '_id'] as const)) {}