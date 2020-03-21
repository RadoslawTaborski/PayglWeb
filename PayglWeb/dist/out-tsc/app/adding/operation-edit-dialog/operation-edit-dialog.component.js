import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { OperationMode } from '../manual-operation/manual-operation.component';
let OperationEditDialogComponent = class OperationEditDialogComponent {
    constructor() {
        this.mode = OperationMode.Import;
    }
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
        this.close();
    }
};
__decorate([
    Input()
], OperationEditDialogComponent.prototype, "visible", void 0);
__decorate([
    Input()
], OperationEditDialogComponent.prototype, "operation", void 0);
OperationEditDialogComponent = __decorate([
    Component({
        selector: 'app-operation-edit-dialog',
        templateUrl: './operation-edit-dialog.component.html',
        styleUrls: ['./operation-edit-dialog.component.css']
    })
], OperationEditDialogComponent);
export { OperationEditDialogComponent };
//# sourceMappingURL=operation-edit-dialog.component.js.map