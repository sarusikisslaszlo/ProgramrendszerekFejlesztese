import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IFinancialGoal } from './FinancialGoal';
import { ISavingsGoal } from './SavingsGoal';

interface IExpenseIncome extends Document {
    name: string;
    amount: number;
    type: string;
    deadline: Date;
    financialGoal: IFinancialGoal;
    savingsGoal: ISavingsGoal;
    user: IUser;
}

const ExpenseIncomeSchema: Schema<IExpenseIncome> = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    deadline: { type: Date, required: true },
    financialGoal: { type: Schema.Types.ObjectId, ref: 'FinancialGoal' },
    savingsGoal: { type: Schema.Types.ObjectId, ref: 'SavingsGoal' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// hook
ExpenseIncomeSchema.pre<IExpenseIncome>('save', function(next) {
    const expenseIncome = this;
    next();
});

export const ExpenseIncome: Model<IExpenseIncome> = mongoose.model<IExpenseIncome>('ExpenseIncome', ExpenseIncomeSchema);