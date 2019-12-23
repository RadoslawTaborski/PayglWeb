import * as tslib_1 from "tslib";
import { Component, Output, Input, EventEmitter } from '@angular/core';
let DashboardNewComponent = class DashboardNewComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.isLoaded = false;
        this.name = "";
    }
    ngOnInit() {
        this.isLoaded = true;
    }
    ngOnChanges() {
        this.isLoaded = true;
    }
    close() {
        this.emitOutput();
    }
    emitOutput() {
        console.log("emited: finished");
        this.finishedOutput.emit(this.filter);
    }
    select() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            this.isLoaded = true;
            this.emitOutput();
        });
    }
};
tslib_1.__decorate([
    Input()
], DashboardNewComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Output()
], DashboardNewComponent.prototype, "finishedOutput", void 0);
DashboardNewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard-new',
        templateUrl: './dashboard-new.component.html',
        styleUrls: ['./dashboard-new.component.css']
    })
], DashboardNewComponent);
export { DashboardNewComponent };
//# sourceMappingURL=dashboard-new.component.js.map