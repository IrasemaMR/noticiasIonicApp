import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { IonContent, IonInfiniteScroll, PopoverController } from '@ionic/angular'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { Noticia } from '../../model/noticias'
import { NoticiasService } from '../../services/noticias.service'
import { PopoverListComponent } from './../../components/popover-list/popover-list.component'

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.page.html',
    styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit, AfterViewInit {
    @ViewChild(IonContent) content: IonContent;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    noticias: Noticia[] = []
    categorias: string[] = ['TODAS']
    categoriaSeleccionada = 'TODAS'
    verFab = false
    // categoriaInputs: any

    // slideOpts = {
    //     slidesPerView: 3.3,
    //     freeMode: true
    // }

    constructor(public popoverController: PopoverController,
        private noticiasService: NoticiasService,
        private iab: InAppBrowser) { }

    async ngOnInit() {
        await this.obtenerCategorias()
        // console.log('this.categorias :>> ', this.categorias);
        await this.obtenerNoticias(false)

    }

    ngAfterViewInit() {
        this.content.ionScroll.subscribe((event)=>{
            if (event.detail.currentY === 0) {this.verFab = false}
            if (event.detail.currentY != 0) {this.verFab = true}
        });
    }

    async cambiarCategoria(event) {
        const popover = await this.popoverController.create({
            component: PopoverListComponent,
            cssClass: 'popover-list',
            event,
            mode: 'ios',
            translucent: true,
            componentProps: {items: this.categorias}
        });
        await popover.present();
        const {data} = await popover.onDidDismiss()
        console.log('CAMBIAR CATEG. data :>> ', data);
        if (data) {
            // this.noticias = []
            this.categoriaSeleccionada = data
            console.log('this.infiniteScroll.disabled :>> ', this.infiniteScroll.disabled);
            this.infiniteScroll.disabled = false 
            this.obtenerNoticias(true)
        }
    }

    async obtenerCategorias() {
        console.log('llama obtener categoria');
        const categorias = await this.noticiasService.listarCategorias()
        if (categorias && categorias.length > 0) {
            this.categorias.push(...categorias)
            console.log('this.categorias :>> ', this.categorias);
        }
               
    }

    async obtenerNoticias(cambioCategoria: boolean, event?) {
        console.log('obtenerNoticias-this.noticias :>> ', this.noticias);
        console.log('event :>> ', event);
        console.log('llama a obtiene noticias');
        const noticias = await this.noticiasService.listarNoticias(this.categoriaSeleccionada, cambioCategoria)
        console.log('resp de obtiene noticias :>> ', noticias);
        if (noticias) {
            console.log('NOTICIAS :>> ', noticias);
            // const noticias: Noticia[] = resp['noticias']
            console.log('cambioCategoria :>> ', cambioCategoria, noticias.length);
            if (cambioCategoria) {
                this.noticias = noticias
            } else {
                this.noticias.push(...noticias)
            }
            console.log('this.noticias :>> ', this.noticias);
            // if (noticias.length === 0) {
            //     if (event) {
            //         // console.log('DISABLED');
            //         // event.target.disabled = true
            //         event.target.complete()
            //     }
            //     return
            // }
            if (event) {
                event.target.complete()
            }
        }
    }

    async recargar(event) {
        console.log('recargar ev :>> ', event);
        
        await this.obtenerNoticias(true, event)
        event.target.complete()
    }

    segmentChanged(event) {
        console.log('event :>> ', event.detail.value);
    }

    scrollToTop() {
        this.content.scrollToTop(400);
        this.verFab = false
    }

    ionViewDidEnter() {
        this.scrollToTop();
    }

    // loadData(event) {
    //     setTimeout(() => {
    //         console.log('Done');
    //         event.target.complete();

    //         // App logic to determine if all data is loaded
    //         // and disable the infinite scroll
    //         if (this.noticias.length > 10) {
    //             event.target.disabled = true;
    //         }
    //     }, 500);
    // }

    // toggleInfiniteScroll() {
    //     this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    // }

    abrirNoticia(index: number) {
        const browser = this.iab.create(this.noticias[index].urlnoticia, '_system');
        console.log('browser :>> ', browser);
    }
}
