import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../shared/data.service';
import { FormsModule } from '@angular/forms';
import { ApplicationStateService } from '../shared/application-state.service';
let AnalysisModule = class AnalysisModule {
};
AnalysisModule = tslib_1.__decorate([
    NgModule({
        declarations: [SearchComponent],
        imports: [
            CommonModule,
            FormsModule
        ],
        exports: [SearchComponent],
        providers: [
            SharedService,
            DataService,
            ApplicationStateService
        ]
    })
], AnalysisModule);
export { AnalysisModule };
//# sourceMappingURL=analysis.module.js.map