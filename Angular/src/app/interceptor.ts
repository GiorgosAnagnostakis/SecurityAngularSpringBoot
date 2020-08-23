import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            switch (req.method) {
                case 'GET':                    
                  break;
                case 'POST':
                  break;
                case 'PUT':
                  if (event instanceof HttpResponse && event.status === 200) {
                    if (event.url.includes('users/reset-password')) {

                      break;
                    }
                    if (!event.url.includes('privateMessages')) {
                    }
                  }
                  break;
                case 'DELETE':
                  if (event instanceof HttpResponse && (event.status === 204 || event.status === 200)) {
                  }
                  break;
              }
        }));
    }

}