import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageExpensesComponent } from './manage-expenses/manage-expenses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    ManageExpensesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'financial-app-frontend';
}
