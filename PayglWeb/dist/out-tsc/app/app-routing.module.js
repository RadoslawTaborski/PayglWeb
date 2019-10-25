import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManualOperationComponent } from './adding/manual-operation/manual-operation.component';
import { GroupComponent } from './adding/group/group.component';
import { SearchComponent } from './analysis/search/search.component';
export const routes = [
    { path: '', redirectTo: 'operation', pathMatch: 'full' },
    { path: 'operation', component: ManualOperationComponent },
    { path: 'group', component: GroupComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', redirectTo: 'operation' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, {
                useHash: false,
                enableTracing: false // for Debugging
            })],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map