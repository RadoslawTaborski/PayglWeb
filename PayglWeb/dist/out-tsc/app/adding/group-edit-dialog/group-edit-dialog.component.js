import { __decorate } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let GroupEditDialogComponent = class GroupEditDialogComponent {
    constructor() {
        this.addEvent = new EventEmitter();
    }
    ngOnInit() {
    }
    ngOnChanges() {
    }
    close() {
        this.addEvent.emit(null);
    }
    getResponseFromGroup($event) {
        this.addEvent.emit($event);
    }
};
__decorate([
    Input()
], GroupEditDialogComponent.prototype, "visible", void 0);
__decorate([
    Input()
], GroupEditDialogComponent.prototype, "operation", void 0);
__decorate([
    Output()
], GroupEditDialogComponent.prototype, "addEvent", void 0);
GroupEditDialogComponent = __decorate([
    Component({
        selector: 'app-group-edit-dialog',
        templateUrl: './group-edit-dialog.component.html',
        styleUrls: ['./group-edit-dialog.component.css'],
    })
], GroupEditDialogComponent);
export { GroupEditDialogComponent };
//# sourceMappingURL=group-edit-dialog.component.js.map