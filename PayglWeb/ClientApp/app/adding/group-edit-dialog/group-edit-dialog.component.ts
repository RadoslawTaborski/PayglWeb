import { Component, OnInit, Input } from '@angular/core';
import { OperationsGroup } from '../../entities/OperationsGroup';

@Component({
  selector: 'app-group-edit-dialog',
  templateUrl: './group-edit-dialog.component.html',
  styleUrls: ['./group-edit-dialog.component.css']
})
export class GroupEditDialogComponent implements OnInit {
    @Input() visible: boolean
    @Input() operation: OperationsGroup

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
