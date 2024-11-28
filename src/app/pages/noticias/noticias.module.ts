import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasPageRoutingModule } from './noticias-routing.module';
import { ComponentsModule } from './../../components/components.module';
import { NoticiasPage } from './noticias.page';
import { PopoverListComponent } from './../../components/popover-list/popover-list.component';

@NgModule({
    entryComponents: [
        PopoverListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NoticiasPageRoutingModule,
        ComponentsModule
    ],
    declarations: [NoticiasPage]
})
export class NoticiasPageModule { }
