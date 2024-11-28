import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UiServiceService } from './../services/ui-service.service';
import { SeguridadService } from './../services/seguridad.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private seguridadService: SeguridadService,
        private uiService: UiServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                console.log(err);
                if (err.status === 401) {
                    console.log('no autorizado renovar el token');
                    console.log(err.error.status);
                    if (err.error.status === -2) {
                        // const resp = this.renovarToken()
                        // console.log('valido', resp);
                    }
                }

                const error = err.error.message || err.statusText;

                console.log(error);
                this.uiService.dismissLoading()
                this.uiService.alertaInformativa(error)
                return throwError(error);
            })
        );
    }

    // async renovarToken() {
    //     const resp: boolean = await this.seguridadService.renuevaToken()
    //     return resp
    // }
}
