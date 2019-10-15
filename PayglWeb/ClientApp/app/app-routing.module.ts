import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualOperationComponent } from './adding/manual-operation/manual-operation.component';
import { GroupComponent } from './adding/group/group.component';

export const routes: Routes = [
    { path: '', redirectTo: 'operation', pathMatch: 'full' },
    { path: 'operation', component: ManualOperationComponent },
    { path: 'group', component: GroupComponent },
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