import { SeguridadService } from './../../services/seguridad.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/noticias';

@Component({
    selector: 'app-configuracion',
    templateUrl: './configuracion.page.html',
    styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

    user: User = {}

    constructor(private seguridadService: SeguridadService) { }

    async ngOnInit() {
        this.user = await this.seguridadService.leerUser()
    }

    async cerrarSesion() {
        await this.seguridadService.logout()
    }
}
