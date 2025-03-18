import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Descessarui, apenas pra demonstrar que pode haver varios interceptors
export function loggingInterceptor(
  req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log(req.url, '*> returned a response with status', event.status);
        }
  }));

}