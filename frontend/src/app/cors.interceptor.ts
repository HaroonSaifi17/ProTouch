import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  const adminToken = localStorage.getItem('admintoken');
  req = req.clone({
    setHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      Authorization: `Bearer ${adminToken}`,
    },
  });
return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        window.location.href = '/adminlogin';
        localStorage.removeItem('adminToken')
      }
      throw error;
    })
  );
};
