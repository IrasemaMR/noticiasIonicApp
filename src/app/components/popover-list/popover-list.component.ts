import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-popover-list',
    templateUrl: './popover-list.component.html',
    styleUrls: ['./popover-list.component.scss'],
})
export class PopoverListComponent implements OnInit {

    @Input() items: any
    @Input() tipo = 1

    constructor(public popoverController: PopoverController) { }

    ngOnInit() {
        console.log('this.items :>> ', this.items);
        // if (!this.items) {this.items = {id: 1, nombre: 'Uno'}, { id:2, nombre: 'Dos'}}
    }

    seleccionar(opcion) {
        console.log(opcion);
        this.popoverController.dismiss(opcion)
    }

}
