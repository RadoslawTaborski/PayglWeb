import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualOperationComponent } from './manual-operation/manual-operation.component';
import { GroupComponent } from './group/group.component';
import { DataService } from '../shared/data.service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { ApplicationStateService } from '../shared/application-state.service';
import { OperationEditDialogComponent } from './operation-edit-dialog/operation-edit-dialog.component';
import { GroupEditDialogComponent } from './group-edit-dialog/group-edit-dialog.component';
import { ImportComponent } from './import/import.component';
import { SchematicDialogComponent } from '../settings/schematic-dialog/schematic-dialog.component';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
    declarations: [ManualOperationComponent, GroupComponent, OperationEditDialogComponent, GroupEditDialogComponent, ImportComponent],
    imports: [
        CommonModule,
        FormsModule,
        SettingsModule,
        FormsModule
    ],
    exports: [ManualOperationComponent, GroupComponent, OperationEditDialogComponent, GroupEditDialogComponent, ImportComponent],
    providers: [
        SharedService,
        DataService,
        ApplicationStateService
    ],
})
export class AddingModule { }
