import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsGoalDialogComponent } from './savings-goal-dialog.component';

describe('SavingsGoalDialogComponent', () => {
  let component: SavingsGoalDialogComponent;
  let fixture: ComponentFixture<SavingsGoalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingsGoalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavingsGoalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
