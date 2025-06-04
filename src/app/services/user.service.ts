import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  register(userData: { name: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }
}
