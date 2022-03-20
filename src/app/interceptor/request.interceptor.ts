import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { LoginService } from './../service/login.service';
// tslint:disable:no-parameter-reassignment
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const statusError = {
          [401]: () => {
            this.loginService.sair(false);
          },
          [403]: () => this.loginService.sair(false),
          default: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Um erro inesperado aconteceu!',
              life: 3000,
            });
          },
        };

        statusError[error.status]
          ? statusError[error.status]()
          : statusError['default']();

        return throwError(error);
      })
    );
  }

  private setHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const token = sessionStorage.getItem('Authorization');

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }

    return req;
  }
}
