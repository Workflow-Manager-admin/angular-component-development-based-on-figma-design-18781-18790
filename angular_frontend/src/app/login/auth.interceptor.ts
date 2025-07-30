import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './login.service';

/**
 * AuthInterceptor attaches the authentication token, and redirects to login on 401 errors.
 */
// PUBLIC_INTERFACE
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);
  private router = inject(Router);

  // PUBLIC_INTERFACE
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token();
    let authReq = req;
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // If 401, redirect to login
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigateByUrl('/login');
        }
        return throwError(() => error);
      })
    );
  }
}

// Convenience export for provider registration
export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
