import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iResponseAuth } from '../interfaces/auth.intercace';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:3001/auth';

  constructor(private http: HttpClient) { }
  
  login(userData: { email: string, password: string }): Observable<iResponseAuth> {
    return this.http.post<iResponseAuth>(`${this.apiUrl}/login`, userData, { withCredentials: true });
  }

  logout(): Observable<iResponseAuth> {
    return this.http.post<iResponseAuth>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true })
  }
}
