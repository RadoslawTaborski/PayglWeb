import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let GroupEditDialogComponent = class GroupEditDialogComponent {
    constructor() {
        this.addEvent = new EventEmitter();
    }
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
        this.close();
    }
};
tslib_1.__decorate([
    Input()
], GroupEditDialogComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], GroupEditDialogComponent.prototype, "operation", void 0);
tslib_1.__decorate([
    Output()
], GroupEditDialogComponent.prototype, "addEvent", void 0);
GroupEditDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-group-edit-dialog',
        templateUrl: './group-edit-dialog.component.html',
        styleUrls: ['./group-edit-dialog.component.css'],
    })
], GroupEditDialogComponent);
export { GroupEditDialogComponent };
//# sourceMappingURL=group-edit-dialog.component.js.map