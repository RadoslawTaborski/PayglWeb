import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualOperationComponent } from './manual-operation/manual-operation.component';
import { GroupComponent } from './group/group.component';
let AddingModule = class AddingModule {
};
AddingModule = tslib_1.__decorate([
    NgModule({
        declarations: [ManualOperationComponent, GroupComponent],
        imports: [
            CommonModule
        ],
        exports: [ManualOperationComponent, GroupComponent],
        providers: [],
    })
], AddingModule);
export { AddingModule };
//# sourceMappingURL=adding.module.js.map