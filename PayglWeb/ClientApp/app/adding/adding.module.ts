import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualOperationComponent } from './manual-operation/manual-operation.component';
import { GroupComponent } from './group/group.component';

@NgModule({
    declarations: [ManualOperationComponent, GroupComponent],
    imports: [
        CommonModule
    ],
    exports: [ManualOperationComponent, GroupComponent],
    providers: [],
})
export class AddingModule { }
