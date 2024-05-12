import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpenseIncomeService } from '../shared/services/expenseIncome.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.css'
})
export class ExpenseDialogComponent implements OnInit {
  expenseIncomeGoalForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private formBuilder: FormBuilder,
    private expenseIncomeService: ExpenseIncomeService
  ) { }

  ngOnInit(): void {
    this.expenseIncomeGoalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      financialGoal: [''],
      savingsGoal: [''],
    })
  }

  onSubmit() {
    if (this.expenseIncomeGoalForm.valid) {
      console.log('Form data:', this.expenseIncomeGoalForm.value);
      this.expenseIncomeService.add(this.expenseIncomeGoalForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
