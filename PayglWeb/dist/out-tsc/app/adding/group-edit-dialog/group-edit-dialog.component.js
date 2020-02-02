import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let GroupEditDialogComponent = class GroupEditDialogComponent {
    constructor() { }
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
], GroupEditDialogComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], GroupEditDialogComponent.prototype, "operation", void 0);
GroupEditDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-group-edit-dialog',
        templateUrl: './group-edit-dialog.component.html',
        styleUrls: ['./group-edit-dialog.component.css'],
    })
], GroupEditDialogComponent);
export { GroupEditDialogComponent };
//# sourceMappingURL=group-edit-dialog.component.js.map