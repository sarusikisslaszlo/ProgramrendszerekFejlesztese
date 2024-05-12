import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FinancialGoal } from '../shared/model/FinancialGoal';
import { SavingsGoal } from '../shared/model/SavingsGoal';
import { ExpenseIncome } from '../shared/model/ExpenseIncome';
import { FinancialGoalService } from '../shared/services/financialGoal.service';
import { SavingsGoalService } from '../shared/services/savingsGoal.service';
import { ExpenseIncomeService } from '../shared/services/expenseIncome.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isChatOpen: boolean = false;
  users?: User[];
  financialGoalList: FinancialGoal[] = [];
  savingsGoalList: SavingsGoal[] = [];
  expenseIncomeList: ExpenseIncome[] = [];
  messageForm!: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private financialGoalService: FinancialGoalService,
    private savingsGoalService: SavingsGoalService,
    private expenseIncomeService: ExpenseIncomeService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.financialGoalService.getAll().subscribe({
      next: (data) => {
        this.financialGoalList = data;
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });

    this.expenseIncomeService.getAll().subscribe({
      next: (data) => {
        this.expenseIncomeList = data;
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });

    this.savingsGoalService.getAll().subscribe({
      next: (data) => {
        this.savingsGoalList = data;
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });

    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.messageForm.valid) {
      console.log('Form data:', this.messageForm.value);
      this.messageService.send(this.messageForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log(this.messageForm.value)
      console.log('Form is not valid.');
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}