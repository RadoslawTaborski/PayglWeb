import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../shared/data.service';
import { FormsModule } from '@angular/forms';
import { ApplicationStateService } from '../shared/application-state.service';
import { FiltersComponent } from './filters/filters.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { OperationComponent } from './templates/operation/operation.component';
import { DashboardOutputComponent } from './templates/dashboard-output/dashboard-output.component';
import { ChartsComponent } from './templates/charts/charts.component';
import { DashboardPiechartComponent } from './templates/dashboard-piechart/dashboard-piechart.component';
let AnalysisModule = class AnalysisModule {
};
AnalysisModule = tslib_1.__decorate([
    NgModule({
        declarations: [SearchComponent, FiltersComponent, DashboardsComponent, AnalysisComponent, OperationComponent, OperationComponent, DashboardOutputComponent, ChartsComponent, DashboardPiechartComponent],
        imports: [
            CommonModule,
            FormsModule
        ],
        exports: [SearchComponent, FiltersComponent, DashboardsComponent, AnalysisComponent],
        providers: [
            SharedService,
            DataService,
            ApplicationStateService
        ]
    })
], AnalysisModule);
export { AnalysisModule };
//# sourceMappingURL=analysis.module.js.map