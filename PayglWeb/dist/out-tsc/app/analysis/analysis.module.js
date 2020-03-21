import { __decorate } from "tslib";
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
import { DashboardPiechartComponent } from './templates/dashboard-piechart/dashboard-piechart.component';
import { DashboardLinechartComponent } from './templates/dashboard-linechart/dashboard-linechart.component';
import { AddingModule } from '../adding/adding.module';
import { FilterSaveComponent } from './filter-save/filter-save.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterSelectionComponent } from './filter-selection/filter-selection.component';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component';
let AnalysisModule = class AnalysisModule {
};
AnalysisModule = __decorate([
    NgModule({
        declarations: [SearchComponent, FiltersComponent, DashboardsComponent, AnalysisComponent, OperationComponent, OperationComponent, DashboardOutputComponent, DashboardPiechartComponent, DashboardLinechartComponent, FilterSaveComponent, FilterSelectionComponent, DashboardNewComponent],
        imports: [
            CommonModule,
            FormsModule,
            AddingModule,
            DragDropModule
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