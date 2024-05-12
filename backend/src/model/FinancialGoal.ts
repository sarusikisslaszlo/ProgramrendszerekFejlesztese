import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

interface IFinancialGoal extends Document {
    name: string;
    amount: number;
    deadline: Date;
    user: IUser;
}

const FinancialGoalSchema: Schema<IFinancialGoal> = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// hook
FinancialGoalSchema.pre<IFinancialGoal>('save', function(next) {
    const financialGoal = this;
    next();
});

export const FinancialGoal: Model<IFinancialGoal> = mongoose.model<IFinancialGoal>('FinancialGoal', FinancialGoalSchema);