import { ModelDefinition } from "@nestjs/mongoose";
import { Task, TaskSchema } from "src/global/schema/task.schema";

export const mongooseTaskSchemas: ModelDefinition[] = [
    { name: Task.name, schema: TaskSchema },
]