import { TestBed } from '@angular/core/testing';

import { FinancialGoalService } from './financialGoal.service';
import { ExpenseIncomeService } from './expenseIncome.service';

describe('ExpenseIncomeService', () => {
  let service: ExpenseIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseIncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});