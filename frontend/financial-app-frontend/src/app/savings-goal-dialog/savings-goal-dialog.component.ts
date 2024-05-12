import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SavingsGoalService } from '../shared/services/savingsGoal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-savings-goal-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './savings-goal-dialog.component.html',
  styleUrl: './savings-goal-dialog.component.css'
})
export class SavingsGoalDialogComponent implements OnInit {
  savingsGoalForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SavingsGoalDialogComponent>,
    private formBuilder: FormBuilder,
    private savingsGoalService: SavingsGoalService
  ) { }

  ngOnInit(): void {
    this.savingsGoalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    })
  }

    onSubmit() {
    if (this.savingsGoalForm.valid) {
      console.log('Form data:', this.savingsGoalForm.value);
      this.savingsGoalService.add(this.savingsGoalForm.value).subscribe({
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
