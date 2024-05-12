import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IMessage extends Document {
    from: string;
    to: string;
    message: string;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
});

// hook
MessageSchema.pre<IMessage>('save', function(next) {
    const message = this;
    next();
});

export const Message: Model<IMessage> = mongoose.model<IMessage>('Message', MessageSchema);