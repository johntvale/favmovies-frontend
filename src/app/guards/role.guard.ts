import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      map(result => {
        if (result.user?.role === 'admin') {
          return true;
        } else {
          this.toastr.error('Usuário não autorizado.');
          return this.router.parseUrl('/login');
        }
      }),
      catchError(() => {
        this.toastr.error('Erro ao verificar autorização.');
        return of(this.router.parseUrl('/login'));
      })
    );
  }
}
