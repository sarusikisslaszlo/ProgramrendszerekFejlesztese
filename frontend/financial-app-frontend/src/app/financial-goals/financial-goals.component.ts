import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinancialGoalDialogComponent } from '../financial-goal-dialog/financial-goal-dialog.component';

@Component({
  selector: 'app-financial-goals',
  standalone: true,
  imports: [],
  templateUrl: './financial-goals.component.html',
  styleUrl: './financial-goals.component.css'
})
export class FinancialGoalsComponent implements OnInit {

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

  goBack() {
    this.location.back();
  }
}
