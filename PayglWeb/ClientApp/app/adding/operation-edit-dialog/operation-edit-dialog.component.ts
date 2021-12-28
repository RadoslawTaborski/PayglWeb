import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../../entities/Operation';
import { OperationMode } from '../manual-operation/manual-operation.component';

@Component({
    selector: 'app-operation-edit-dialog',
    templateUrl: './operation-edit-dialog.component.html',
    styleUrls: ['./operation-edit-dialog.component.css']
})
export class OperationEditDialogComponent implements OnInit {
    @Input() visible: boolean
    @Input() operation: Operation
    mode: OperationMode = OperationMode.Import

    constructor() { }

    ngOnInit() {
        this.visible = true;
    }

    ngOnChanges() {
        this.visible = true;
    }

    close() {
        //console.log("close")
        this.visible = false;
    }

    getResponseFromOperation($event) {
        //console.log("got: " + $event)

        this.close()
    }

}
