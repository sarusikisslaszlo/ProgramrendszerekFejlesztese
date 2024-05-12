import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SavingsGoal } from '../model/SavingsGoal';

@Injectable({
  providedIn: 'root'
})
export class SavingsGoalService {

  constructor(private http: HttpClient) { }

  add(savingsGoal: SavingsGoal) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', savingsGoal.name);
    body.set('amount', savingsGoal.amount.toString());
    body.set('deadline', savingsGoal.deadline.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5001/app/savings-goal/add', body, {headers: headers, withCredentials: true});
  }

  getAll() {
    return this.http.get<SavingsGoal[]>('http://localhost:5001/app/getAllSavingsGoal', {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5001/app/deleteSavingsGoal?id=' + id, {withCredentials: true});
  }
}