import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SavingsGoalDialogComponent } from '../savings-goal-dialog/savings-goal-dialog.component';
import { SavingsGoalService } from '../shared/services/savingsGoal.service';
import { SavingsGoal } from '../shared/model/SavingsGoal';

@Component({
  selector: 'app-savings-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './savings-goals.component.html',
  styleUrl: './savings-goals.component.css',
  providers: [DatePipe]
})
export class SavingsGoalsComponent implements OnInit {
  savingsGoalList: SavingsGoal[] = [];

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private savingsGoalService: SavingsGoalService
  ) { }

  ngOnInit(): void {
    this.savingsGoalService.getAll().subscribe({
      next: (data) => {
        this.savingsGoalList = data;
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

    const dialogRef = this.dialog.open(SavingsGoalDialogComponent, dialogConfig);

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

  deleteSavingsGoal(savingsGoal: SavingsGoal): void {
    const confirmDelete = confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      this.savingsGoalService.delete(savingsGoal._id).subscribe({
        next: () => {
          // Remove deleted item from the list
          this.savingsGoalList = this.savingsGoalList.filter(
            (item) => item._id !== savingsGoal._id
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
