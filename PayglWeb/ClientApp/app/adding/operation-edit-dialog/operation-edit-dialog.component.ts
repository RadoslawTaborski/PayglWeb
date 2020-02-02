import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../../entities/Operation';

@Component({
    selector: 'app-operation-edit-dialog',
    templateUrl: './operation-edit-dialog.component.html',
    styleUrls: ['./operation-edit-dialog.component.css']
})
export class OperationEditDialogComponent implements OnInit {
    @Input() visible: boolean
    @Input() operation: Operation

    constructor() { }

    ngOnInit() {
        this.visible = true;
        console.log("hello world")
    }

    ngOnChanges() {
        this.visible = true;
        console.log("hello world")
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
