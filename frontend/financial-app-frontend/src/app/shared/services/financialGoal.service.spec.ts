import { TestBed } from '@angular/core/testing';

import { FinancialGoalService } from './financialGoal.service';

describe('FinancialGoalService', () => {
  let service: FinancialGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});