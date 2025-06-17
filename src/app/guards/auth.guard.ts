import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      map(result => !!result.user),
      catchError((error) => {
        if (error.status === 401) {
          this.toastr.error('Usuário não autenticado');
        }
        this.toastr.error('Erro ao verificar autenticação.');
        return of(this.router.parseUrl('/login'));
      })
    );
  }
}