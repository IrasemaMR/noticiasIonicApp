import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiServiceService {
    loading: any

    constructor(private alertController: AlertController,
        private toastController: ToastController,
        private loadingCtrl: LoadingController) { }

    async alertaInformativa(message: string) {
        console.log('ALERTA:', message);
        const alert = await this.alertController.create({
            message,
            mode: 'ios',
            buttons: ['Aceptar']
        });

        await alert.present();
    }

    async alertaConfirmacion(message: string) {
        let respuesta
        const alert = await this.alertController.create({
            message,
            mode: 'ios',
            buttons: [
                {
                    text: 'Sí',
                    handler: () => { respuesta = true }
                },
                {
                    text: 'No', role: 'cancel', // cssClass: 'secondary',
                    handler: () => { respuesta = false }
                }
            ]
        });

        await alert.present()
        const result = await alert.onDidDismiss().then(() => {
            return respuesta
        });

        return result
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            position: 'top',
            duration: 3000,
            color: 'primary',
            cssClass: 'toast'
        });
        toast.present();
    }

    async presentLoading(message: string) {
        this.loading = await this.loadingCtrl.create({
            message
            // duration: 2000
        });
        return await this.loading.present();
    }

    async dismissLoading() {
        if (this.loading) {
            return await this.loading.dismiss();
        }
    }

}
