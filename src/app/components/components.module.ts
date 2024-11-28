import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverListComponent } from './popover-list/popover-list.component';



@NgModule({
    declarations: [
        PopoverListComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PopoverListComponent
    ]
})
export class ComponentsModule { }
