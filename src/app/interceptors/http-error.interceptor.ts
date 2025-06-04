import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const status = error.status;
        const message = error.error?.message || 'Erro inesperado.';
        
        this.toastr.error(`${message} (Código: ${status})`, 'Erro');

        return throwError(() => error);
      })
    );
  }
}