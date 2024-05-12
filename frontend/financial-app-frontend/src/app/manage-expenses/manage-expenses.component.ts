import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { ExpenseIncome } from '../shared/model/ExpenseIncome';
import { ExpenseIncomeService } from '../shared/services/expenseIncome.service';

@Component({
  selector: 'app-manage-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-expenses.component.html',
  styleUrl: './manage-expenses.component.css',
  providers: [DatePipe]
})
export class ManageExpensesComponent implements OnInit {
  expenseIncomeList: ExpenseIncome[] = [];

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private expenseIncomeService: ExpenseIncomeService
  ) { }

  ngOnInit(): void {
    this.expenseIncomeService.getAll().subscribe({
      next: (data) => {
        this.expenseIncomeList = data;
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'expense-dialog-container';

    const dialogRef = this.dialog.open(ExpenseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
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

  deleteExpenseIncome(expenseIncome: ExpenseIncome): void {
    const confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      this.expenseIncomeService.delete(expenseIncome._id).subscribe({
        next: () => {
          // Remove deleted item from the list
          this.expenseIncomeList = this.expenseIncomeList.filter(
            (item) => item._id !== expenseIncome._id
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
