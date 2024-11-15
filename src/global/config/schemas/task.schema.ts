import { ModelDefinition } from "@nestjs/mongoose";
import { Task, TaskSchema } from "src/global/schema/task.schema";
import { User, UserSchema } from "src/global/schema/user.schema";

export const mongooseTaskSchemas: ModelDefinition[] = [
    { name: Task.name, schema: TaskSchema },
    { name: User.name, schema: UserSchema },
]