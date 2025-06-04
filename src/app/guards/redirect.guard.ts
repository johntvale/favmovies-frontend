import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, catchError, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      map(result => {
        if (result.user?.role === 'admin') return this.router.parseUrl('/admin');
        if (result.user?.role === 'user') return this.router.parseUrl('/movies');

        return this.router.parseUrl('/login');
      }),
      catchError(() => {        
        return of(this.router.parseUrl('/login'));
      })
    );
  }
}
