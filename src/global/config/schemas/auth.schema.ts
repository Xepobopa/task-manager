import { ModelDefinition } from "@nestjs/mongoose";
import { User, UserSchema } from "src/global/schema/user.schema";

export const mongooseUserSchemas: ModelDefinition[] = [
    { name: User.name, schema: UserSchema },
]