import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from './import/import.component';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../shared/data.service';
import { ApplicationStateService } from '../shared/application-state.service';
import { SchematicDialogComponent } from './schematic-dialog/schematic-dialog.component';
import { FormsModule } from '@angular/forms';
let SettingsModule = class SettingsModule {
};
SettingsModule = tslib_1.__decorate([
    NgModule({
        declarations: [ImportComponent, SchematicDialogComponent],
        exports: [ImportComponent, SchematicDialogComponent],
        imports: [
            CommonModule,
            FormsModule
        ],
        providers: [
            SharedService,
            DataService,
            ApplicationStateService
        ]
    })
], SettingsModule);
export { SettingsModule };
//# sourceMappingURL=settings.module.js.map