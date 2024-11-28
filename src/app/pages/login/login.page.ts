import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { SeguridadService } from '../../services/seguridad.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    @ViewChild('slidePrincipal', { read: false, static: true }) slides: IonSlides;
    version = environment.version

    usuarioLogin = {
        correo: '',
    }
    usuarioRegistro = {
        correo: '',
        codigoValida: ''
    };
    verVolver = false

    constructor(private navCtrl: NavController,
        private seguridadService: SeguridadService) { }

    ngOnInit() {
        this.slides.lockSwipes(true)
    }


    mostrarLogin() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(0);
        this.slides.lockSwipes(true);
    }

    mostrarRegistro() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1);
        this.slides.lockSwipes(true);
    }

    async login(fLogin: NgForm) {

        if (fLogin.invalid) { return }
        console.log('fLogin :>> ', fLogin);

        console.log('this.usuarioLogin.correo :>> ', this.usuarioLogin.correo);
        const resp = await this.seguridadService.login(this.usuarioLogin.correo)
        console.log('resp :>> ', resp);
        if (resp) {
            this.usuarioRegistro.correo = this.usuarioLogin.correo
            this.mostrarRegistro()
            // navegar al tabs
            // this.navCtrl.navigateRoot('/inicio', { animated: true });
        } else {
            // mostrar alerta de usuario y contraseña no correctos
            // this.uiService.alertaInformativa(resp);
        }
    }

    async validar( fValidar: NgForm ) {

        console.log(fValidar.valid);
        if ( fValidar.invalid ) { return; }

        console.log('validar codigo#', this.usuarioRegistro.codigoValida);
        const valido = await this.seguridadService.validaCodigo(this.usuarioRegistro.correo, this.usuarioRegistro.codigoValida)
        console.log('valido', valido);
        if (valido) {
            const token = await this.seguridadService.leerToken()
            console.log('token OK:>> ', token);
            // navegar al tabs
            this.navCtrl.navigateRoot('/main/tabs/noticias', { animated: true });
        } else {
            // mostrar alerta de usuario y contraseña no correctos
            // this.uiService.alertaInformativa('Correo o código no válido.');
        }
    }
}
