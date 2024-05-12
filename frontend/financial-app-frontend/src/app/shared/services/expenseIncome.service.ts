import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseIncome } from '../model/ExpenseIncome';

@Injectable({
  providedIn: 'root'
})
export class ExpenseIncomeService {

  constructor(private http: HttpClient) { }

  add(expenseIncome: ExpenseIncome) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', expenseIncome.name);
    body.set('amount', expenseIncome.amount.toString());
    body.set('type', expenseIncome.type);
    body.set('deadline', expenseIncome.deadline.toString());
    body.set('financialGoal', expenseIncome.financialGoal);
    body.set('savingsGoal', expenseIncome.savingsGoal);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5001/app/expense-income/add', body, {headers: headers, withCredentials: true});
  }
}