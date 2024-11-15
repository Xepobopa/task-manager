import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
    tasks: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);