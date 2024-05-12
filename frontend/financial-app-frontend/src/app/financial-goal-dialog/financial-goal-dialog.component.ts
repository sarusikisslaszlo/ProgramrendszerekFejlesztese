import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FinancialGoalService } from '../shared/services/financialGoal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-goal-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './financial-goal-dialog.component.html',
  styleUrl: './financial-goal-dialog.component.css'
})
export class FinancialGoalDialogComponent implements OnInit {
  financialGoalForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FinancialGoalDialogComponent>,
    private formBuilder: FormBuilder,
    private financialGoalService: FinancialGoalService
  ) { }

  ngOnInit(): void {
    this.financialGoalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.financialGoalForm.valid) {
      console.log('Form data:', this.financialGoalForm.value);
      this.financialGoalService.add(this.financialGoalForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.dialogRef.close();
          window.location.reload();
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
