import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

  register(userData: { name: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
