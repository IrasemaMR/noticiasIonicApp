import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { StorageService } from '../_services/storage.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
    constructor( // private storageService: StorageService
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // debugger;
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // this.storageService.clearStorage();
                // location.reload(true);
                console.log('no autorizado limpiar el storage');
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
