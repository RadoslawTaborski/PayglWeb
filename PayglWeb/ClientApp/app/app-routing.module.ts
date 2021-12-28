import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualOperationComponent } from './adding/manual-operation/manual-operation.component';
import { GroupComponent } from './adding/group/group.component';
import { SearchComponent } from './analysis/search/search.component';
import { FiltersComponent } from './analysis/filters/filters.component';
import { DashboardsComponent } from './analysis/dashboards/dashboards.component';
import { AnalysisComponent } from './analysis/analysis/analysis.component';
import { ImportComponent } from './adding/import/import.component';
import { ImportComponent as ImportSettings } from './settings/import/import.component';

export const routes: Routes = [
    { path: '', redirectTo: 'operation', pathMatch: 'full' },
    { path: 'operation', component: ManualOperationComponent },
    { path: 'group', component: GroupComponent },
    { path: 'import', component: ImportComponent },
    { path: 'search', component: SearchComponent },
    { path: 'filters', component: FiltersComponent },
    { path: 'dashboards', component: DashboardsComponent },
    { path: 'analysis', component: AnalysisComponent },
    { path: 'importsettings', component: ImportSettings },
    { path: '**', redirectTo: 'operation' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: false,
        enableTracing: false // for Debugging
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }