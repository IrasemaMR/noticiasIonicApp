import { SeguridadService } from './seguridad.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Noticia } from '../model/noticias';

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {
    pagina = 0

    constructor(private http: HttpClient,
        private seguridadService: SeguridadService) { }

    // async getHeaders() {
    //     const token = await this.seguridadService.leerToken()
    //     const headers = new HttpHeaders({
    //         Authorization: token
    //     })
    //     return headers
    // }

    // listarCategorias() {

    //     return this.http.get(`${environment.urlApi}/usuario/listarCategorias`)
    // }

    async listarCategorias () {
        console.log('entra a listarCategoria (service)');
        const ok = await this.seguridadService.evaluarToken()
        console.log('ok listarCategorias:>> ', ok);
        if (!ok) {return null}
        console.log('termina evaluar token en categoria');
        return new Promise<string[]>( resolve => {
            this.http.get(`${environment.urlApi}/usuario/listarCategorias`).subscribe((resp:any) => {
                if (!resp.categorias) { resolve(null) }
                const categorias: string[] = resp.categorias
                resolve(categorias)
            })
        })
    }

    async listarNoticias(categoria: string, cambioCategoria: boolean) {
        console.log('ListarNoticias: categoria, cambioCategoria :>> ', categoria, cambioCategoria);
        const ok = await this.seguridadService.evaluarToken()
        console.log('ok listarNoticias:>> ', ok);
        if (!ok) {return null}
        if (cambioCategoria) {this.pagina = 0}
        this.pagina ++
        return new Promise<Noticia[]>( resolve => {
            this.http.get(`${environment.urlApi}/noticia/listarUsuarioNoticia/${categoria}/${this.pagina}`).subscribe((resp:any) => {
                if (!resp.noticias) { resolve(null) }
                const noticias: Noticia[] = resp.noticias
                resolve(noticias)
            })
        })
    }
}
