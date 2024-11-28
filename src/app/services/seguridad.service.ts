import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
// import { Storage } from '@ionic/storage'
// import { Storage } from '@ionic/storage-angular'
import { NavController } from '@ionic/angular'
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { UiServiceService } from './ui-service.service';
import { environment } from '../../environments/environment'
import { User } from '../model/noticias';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class SeguridadService {
    token: string = null

    constructor(private http: HttpClient,
        private storage: StorageService,
        private navController: NavController,
        private uiService: UiServiceService) { }

    login( correo: string ) {
        console.log('correo :>> ', correo);
        // const data = { correo };
        
        return new Promise( resolve => {
            // let headers = new HttpHeaders();
            // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

            this.http.post(`${ environment.urlApi }/usuario/login`, {correo} )
                .subscribe( async resp => {
                    console.log(resp);
                    console.log('resp del login', resp['ok']);

                    if ( !resp ) {
                        // this.token = null;
                        // this.storage.clear();
                        resolve(false);
                    } else {
                        if (resp['ok']) {
                            resolve(true)
                        } else {
                            this.uiService.presentToast(resp['mensaje'])
                            resolve(false)
                        }
                        // await this.guardarToken( resp['token'] );
                        // resolve(true);
                    }
                }, error => {
                    console.log('error en ingreso', error);
                    resolve(false)
                });
        });
    }

    validaCodigo( correo: string, validador: string ) {
        return new Promise( resolve => {
            this.http.post(`${ environment.urlApi }/usuario/validar`, {correo, validador} )
                .subscribe( async resp => {
                    console.log('resp del login', resp['ok']);

                    if ( !resp['ok'] ) {
                        this.token = null;
                        this.storage.clear();
                        this.uiService.presentToast(resp['mensaje'])
                        resolve(false);
                    } else {
                        await this.guardarToken( resp['token'] );
                        resolve(true);
                    }
                }, error => {
                    console.log('error de valida codigo', error);
                });
        });
    }
    
    async guardarToken( token: string ) {
        console.log('entra a guardar token :>> ', token);
        this.token = token;
        await this.storage.set('token', token);
    
        const decodedToken = helper.decodeToken(this.token);
        const user = {
            correo: decodedToken.correo,
            empresa: decodedToken.empresa
        }
        await this.storage.set('user', user)

    }

    async leerUser() {
        const user: User = await this.storage.get('user') || null
        return user
    }

    async leerToken() {
        this.token = await this.storage.get('token') || null
        return this.token
    }

    async existeToken(): Promise<boolean> {
        await this.leerToken()
        if (!this.token) {
            this.navController.navigateRoot('/login')
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }

    async evaluarToken() {
        const existeToken = await this.existeToken()
        if (!existeToken) {return Promise.resolve(false)}
        if (helper.isTokenExpired(this.token)) {
            console.log('EvaluarToken: el token ha expirado');
            const resp = await this.renuevaToken()
            console.log(resp);
            if (resp) {
                console.log('EvaluarToken: token renovado');
                return Promise.resolve(true)
            } else {
                console.log('EvaluarToken: error al renovar token');
                return Promise.resolve(false)
            }
        }
        console.log('evaluar token: true');
        return Promise.resolve(true)
    }

    async renuevaToken() {
        console.log('entra a renueva token');
        return new Promise<boolean>(async resolve => {
            this.http.post(`${environment.urlApi}/usuario/renuevaToken`, {  })
                .subscribe(async resp => {
                    console.log(resp);
                    if (resp['ok']) {
                        await this.guardarToken(resp['token']);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, error => {
                    console.log('error al renovar el token', error);
                    resolve(false)
                });
        });
    }

    async logout() {
        await this.uiService.alertaConfirmacion('¿Está seguro de desvincular el correo electrónico en este equipo?').then(async (resp) => {
            if (resp) {
                this.navController.navigateRoot('/login')
                this.token = null
                this.storage.clear()
            }
        })
    }
}
