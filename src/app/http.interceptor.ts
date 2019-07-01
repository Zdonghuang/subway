import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize, tap } from 'rxjs/operators';
import { SettingsService } from './services/settings.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public router: Router, public settings: SettingsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('/')) {
      request = request.clone({
        url: this.settings.getApiBaseUrl() + request.url
      });
    }

    if (!request.headers.has('Authorization')) {
      let token = localStorage.getItem('token');
      if (token) {
        if (!token.startsWith('Bearer ')) {
            token = 'Bearer ' + token;
        }

        request = request.clone({
            setHeaders: {
                Authorization: token
            }
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err: HttpEvent<any>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    );
  }

  }
