import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { TaskStatus } from "src/global/enum/task-status.enum";

@Schema()
export class Task extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    desc: string;

    @Prop({ 
        type: String,
        enum: TaskStatus,
        required: true,
        default: TaskStatus.NEW
    })
    status: TaskStatus

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    // subTasks: Task[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);