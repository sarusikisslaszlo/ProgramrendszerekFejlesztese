import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinancialGoalDialogComponent } from '../financial-goal-dialog/financial-goal-dialog.component';
import { FinancialGoal } from '../shared/model/FinancialGoal';
import { FinancialGoalService } from '../shared/services/financialGoal.service';

@Component({
  selector: 'app-financial-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-goals.component.html',
  styleUrl: './financial-goals.component.css',
  providers: [DatePipe]
})
export class FinancialGoalsComponent implements OnInit {
  financialGoalList: FinancialGoal[] = [];

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private financialGoalService: FinancialGoalService
  ) { }

  ngOnInit(): void {
    this.financialGoalService.getAll().subscribe({
      next: (data) => {
        this.financialGoalList = data;
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

    const dialogRef = this.dialog.open(FinancialGoalDialogComponent, dialogConfig);

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

  deleteFinancialGoal(financialGoal: FinancialGoal): void {
    const confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      this.financialGoalService.delete(financialGoal._id).subscribe({
        next: () => {
          // Remove deleted item from the list
          this.financialGoalList = this.financialGoalList.filter(
            (item) => item._id !== financialGoal._id
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
