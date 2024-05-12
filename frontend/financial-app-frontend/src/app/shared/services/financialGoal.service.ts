import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialGoal } from '../model/FinancialGoal';

@Injectable({
  providedIn: 'root'
})
export class FinancialGoalService {

  constructor(private http: HttpClient) { }

  add(financialGoal: FinancialGoal) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', financialGoal.name);
    body.set('amount', financialGoal.amount.toString());
    body.set('deadline', financialGoal.deadline.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5001/app/financial-goal/add', body, {headers: headers, withCredentials: true});
  }

  getAll() {
    return this.http.get<FinancialGoal[]>('http://localhost:5001/app/getAllFinancialGoal', {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5001/app/deleteFinancialGoal?id=' + id, {withCredentials: true});
  }
}