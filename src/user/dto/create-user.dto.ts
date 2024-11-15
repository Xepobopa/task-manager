import { OmitType } from "@nestjs/mapped-types";
import { UserDto } from "./user.dto";

export class CreateUserDto extends OmitType(UserDto, ['tasks', '_id'] as const) {}