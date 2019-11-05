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

@NgModule({
    declarations: [SearchComponent, FiltersComponent, DashboardsComponent, AnalysisComponent],
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
export class AnalysisModule { }
