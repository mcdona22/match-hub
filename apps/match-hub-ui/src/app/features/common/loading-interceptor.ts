import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../loading/application/loading-service';
import { delay, finalize } from 'rxjs';

const ARTIFICIAL_DELAY_MS = 250;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.loadingStart();
  return next(req).pipe(
    delay(ARTIFICIAL_DELAY_MS),
    finalize(() => loadingService.loadingStop()),
  );
};
