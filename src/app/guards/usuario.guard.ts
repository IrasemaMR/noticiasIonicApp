import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './../services/seguridad.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {
    constructor(private seguridadService: SeguridadService) { }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        console.log('guard');
        return this.seguridadService.existeToken()
    }

}
