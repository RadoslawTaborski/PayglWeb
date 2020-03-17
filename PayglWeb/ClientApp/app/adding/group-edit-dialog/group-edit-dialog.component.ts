import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OperationsGroup } from '../../entities/OperationsGroup';

@Component({
  selector: 'app-group-edit-dialog',
  templateUrl: './group-edit-dialog.component.html',
  styleUrls: ['./group-edit-dialog.component.css'],
})
export class GroupEditDialogComponent implements OnInit {
    @Input() visible: boolean
    @Input() operation: OperationsGroup
    @Output() addEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.visible = true;
    }

    ngOnChanges() {
        this.visible = true;
    }

    close() {
        this.visible = false;
    }

    getResponseFromGroup($event) {
        this.addEvent.emit($event);
        this.close()
    }
}
