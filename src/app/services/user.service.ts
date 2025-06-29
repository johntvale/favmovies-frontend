import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { iBasicUser, iResponseBasicUser, iResponseUser, iUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

  register(userData: { name: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getUserList(): Observable<iBasicUser[]> {
    return this.http.get<iResponseBasicUser>(`${this.apiUrl}/search`, { withCredentials: true }).pipe(
      map(response => response.users)
    );
  }

  getUserById(userId: string): Observable<iUser> {
    return this.http.get<iResponseUser>(`${this.apiUrl}/search/${userId}`, { withCredentials: true }).pipe(
      map(response => response.user)
    );
  }

  promoteUserToAdmin(userId: string) {
    return this.http.patch<iResponseBasicUser>(
      `${this.apiUrl}/update/${userId}`,
      { "role": "admin" },
      { withCredentials: true }
    );
  }

  demoteAdminToUser(userId: string) {
    return this.http.patch<iResponseBasicUser>(
      `${this.apiUrl}/update/${userId}`,
      { "role": "user" },
      { withCredentials: true }
    );
  }

  updateUserData(userData: iUser, userId: string): Observable<iResponseBasicUser> {
    return this.http.patch<iResponseBasicUser>(
      `${this.apiUrl}/update/${userId}`,
      userData,
      { withCredentials: true }
    );
  }
}
