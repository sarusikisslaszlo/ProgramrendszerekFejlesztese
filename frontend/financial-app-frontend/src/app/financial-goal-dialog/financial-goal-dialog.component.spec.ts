import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialGoalDialogComponent } from './financial-goal-dialog.component';

describe('FinancialGoalDialogComponent', () => {
  let component: FinancialGoalDialogComponent;
  let fixture: ComponentFixture<FinancialGoalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialGoalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialGoalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
