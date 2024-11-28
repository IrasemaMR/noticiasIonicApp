import { Component } from '@angular/core';
import { NotificacionesService } from './services/notificaciones.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private notificacionesService: NotificacionesService) {
        console.log('constructor del appComponent');
        this.notificacionesService.configuracionInicial()
    }
}
