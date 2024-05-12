import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialGoal } from '../model/FinancialGoal';
import { Message } from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  send(message: Message) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('from', message.from);
    body.set('to', message.to);
    body.set('message', message.message);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5001/app/send-message', body, {headers: headers, withCredentials: true});
  }

  getAll() {
    return this.http.get<Message[]>('http://localhost:5001/app/getAllMessages', {withCredentials: true});
  }

  getAllByUser(id: string) {
    return this.http.get<Message[]>('http://localhost:5001/app/getMessagesByUser?id=' + id, {withCredentials: true});
  }
}