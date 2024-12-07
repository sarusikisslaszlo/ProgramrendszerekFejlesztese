import mongoose, { Document, Model, Schema } from 'mongoose';

const SALT_FACTOR = 10;

export interface IUser extends Document {
    email: string;
    name?: string;
    address?: string;
    nickname?: string;
    password: string;
    role: string;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    nickname: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);