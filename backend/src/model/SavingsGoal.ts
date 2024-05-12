import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

interface ISavingsGoal extends Document {
    name: string;
    amount: number;
    deadline: Date;
    user: IUser;
}

const SavingsGoalSchema: Schema<ISavingsGoal> = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// hook
SavingsGoalSchema.pre<ISavingsGoal>('save', function(next) {
    const savingsGoal = this;
    next();
});

export const SavingsGoal: Model<ISavingsGoal> = mongoose.model<ISavingsGoal>('SavingsGoal', SavingsGoalSchema);