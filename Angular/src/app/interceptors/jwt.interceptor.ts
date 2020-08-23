import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentJwtPayload = JSON.parse(localStorage.getItem('currentJwtPayload'));
    if (currentJwtPayload) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentJwtPayload.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
