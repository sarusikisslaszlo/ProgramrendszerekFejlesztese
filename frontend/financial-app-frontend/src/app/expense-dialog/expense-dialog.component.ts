import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseIncomeService } from '../shared/services/expenseIncome.service';
import { CommonModule } from '@angular/common';
import { FinancialGoalService } from '../shared/services/financialGoal.service';
import { SavingsGoalService } from '../shared/services/savingsGoal.service';
import { FinancialGoal } from '../shared/model/FinancialGoal';
import { SavingsGoal } from '../shared/model/SavingsGoal';

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-dialog.component.html',
  styleUrl: './expense-dialog.component.css'
})
export class ExpenseDialogComponent implements OnInit {
  expenseIncomeGoalForm!: FormGroup;
  isTypeDropdownOpen: boolean = false;
  selectedType: string = '';
  isFinancialDropdownOpen: boolean = false;
  selectedFinancialType: string = '';
  isSavingsDropdownOpen: boolean = false;
  selectedSavingsType: string = '';

  financialGoals: FinancialGoal[] = [];
  savingsGoals: SavingsGoal[] = [];

  constructor(
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private formBuilder: FormBuilder,
    private expenseIncomeService: ExpenseIncomeService,
    private financialGoalService: FinancialGoalService,
    private savingsGoalService: SavingsGoalService
  ) { }

  ngOnInit(): void {
    this.financialGoalService.getAll().subscribe({
      next: (data) => {
        this.financialGoals = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.savingsGoalService.getAll().subscribe({
      next: (data) => {
        this.savingsGoals = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.expenseIncomeGoalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      financialGoal: ['', [Validators.required]],
      savingsGoal: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.expenseIncomeGoalForm.valid) {
      console.log('Form data:', this.expenseIncomeGoalForm.value);
      this.expenseIncomeService.add(this.expenseIncomeGoalForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.dialogRef.close();
          window.location.reload();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log(this.expenseIncomeGoalForm.value)
      console.log('Form is not valid.');
    }
  }

  selectType(type: string) {
    this.selectedType = type;
    this.expenseIncomeGoalForm.patchValue({ type: type });
    this.isTypeDropdownOpen = false; // Close the dropdown after selection if needed
  }

  toggleTypeDropdown() {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  selectFinancialType(type: FinancialGoal) {
    this.selectedFinancialType = type.name;
    this.expenseIncomeGoalForm.patchValue({ financialGoal: type._id });
    this.isFinancialDropdownOpen = false; // Close the dropdown after selection if needed
  }

  toggleFinancialDropdown() {
    this.isFinancialDropdownOpen = !this.isFinancialDropdownOpen;
  }

  selectSavingsType(type: SavingsGoal) {
    this.selectedSavingsType = type.name;
    this.expenseIncomeGoalForm.patchValue({ savingsGoal: type._id });
    this.isSavingsDropdownOpen = false; // Close the dropdown after selection if needed
  }

  toggleSavingsDropdown() {
    this.isSavingsDropdownOpen = !this.isSavingsDropdownOpen;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
