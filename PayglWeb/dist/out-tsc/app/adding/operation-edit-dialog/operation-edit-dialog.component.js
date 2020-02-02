import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { OperationMode } from '../manual-operation/manual-operation.component';
let OperationEditDialogComponent = class OperationEditDialogComponent {
    constructor() {
        this.mode = OperationMode.Import;
    }
    ngOnInit() {
        this.visible = true;
        console.log("hello world");
    }
    ngOnChanges() {
        this.visible = true;
        console.log("hello world");
    }
    close() {
        //console.log("close")
        this.visible = false;
    }
    getResponseFromOperation($event) {
        //console.log("got: " + $event)
        this.close();
    }
};
tslib_1.__decorate([
    Input()
], OperationEditDialogComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], OperationEditDialogComponent.prototype, "operation", void 0);
OperationEditDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-operation-edit-dialog',
        templateUrl: './operation-edit-dialog.component.html',
        styleUrls: ['./operation-edit-dialog.component.css']
    })
], OperationEditDialogComponent);
export { OperationEditDialogComponent };
//# sourceMappingURL=operation-edit-dialog.component.js.map