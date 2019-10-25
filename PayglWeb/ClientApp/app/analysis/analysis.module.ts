import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../shared/data.service';
import { FormsModule } from '@angular/forms';
import { ApplicationStateService } from '../shared/application-state.service';

@NgModule({
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
export class AnalysisModule { }
