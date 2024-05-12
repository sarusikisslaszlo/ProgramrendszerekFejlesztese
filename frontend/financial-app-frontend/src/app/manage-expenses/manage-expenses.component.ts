import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-manage-expenses',
  standalone: true,
  imports: [],
  templateUrl: './manage-expenses.component.html',
  styleUrl: './manage-expenses.component.css'
})
export class ManageExpensesComponent implements OnInit {

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

  goBack() {
    this.location.back();
  }

}
