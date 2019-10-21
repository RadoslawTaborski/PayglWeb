import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualOperationComponent } from './manual-operation/manual-operation.component';
import { GroupComponent } from './group/group.component';
import { DataService } from '../shared/data.service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
let AddingModule = class AddingModule {
};
AddingModule = tslib_1.__decorate([
    NgModule({
        declarations: [ManualOperationComponent, GroupComponent],
        imports: [
            CommonModule,
            FormsModule
        ],
        exports: [ManualOperationComponent, GroupComponent],
        providers: [
            SharedService,
            DataService
        ],
    })
], AddingModule);
export { AddingModule };
//# sourceMappingURL=adding.module.js.map