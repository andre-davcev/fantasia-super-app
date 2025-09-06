import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../../services';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage: StorageService = inject(StorageService);
  const router: Router = inject(Router);

  const token: string | null = storage.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        storage.clearToken();
        router.navigate(['login']);
      }

      return throwError(() => error);
    })
  );
};
