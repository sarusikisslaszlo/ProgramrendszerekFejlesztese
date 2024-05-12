import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SavingsGoalDialogComponent } from '../savings-goal-dialog/savings-goal-dialog.component';

@Component({
  selector: 'app-savings-goals',
  standalone: true,
  imports: [],
  templateUrl: './savings-goals.component.html',
  styleUrl: './savings-goals.component.css'
})
export class SavingsGoalsComponent {

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

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

  goBack() {
    this.location.back();
  }
}
