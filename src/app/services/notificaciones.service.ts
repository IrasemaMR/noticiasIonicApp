import { Injectable } from '@angular/core'
import { OneSignal } from '@ionic-native/onesignal/ngx'
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx'

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    constructor(private oneSignal: OneSignal) { }

    configuracionInicial() {
        console.log('inicializa oneSignal');
        this.oneSignal.startInit('15697e05-1a9d-47a2-a3ef-632c110f8b04', '1046532635906');
        // this.oneSignal.startInit('15697e05-1a9d-47a2-a3ef-632c110f8b04', '1046532635906');
        
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        
        this.oneSignal.handleNotificationReceived().subscribe((data) => {
            // do something when notification is received
            console.log('Notificación recibida :>> ', data);
        });
        
        this.oneSignal.handleNotificationOpened().subscribe((data) => {
            // do something when a notification is opened
            console.log('Notificación abierta :>> ', data);
        });
        
        this.oneSignal.endInit();
    }
}
