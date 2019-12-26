import * as tslib_1 from "tslib";
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Message, MessageType } from '../templates/message/Message';
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
        this.emitOutput(undefined);
    }
    emitOutput(name) {
        console.log("emited: finished");
        this.finishedOutput.emit(name);
    }
    select() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            if (this.name.length > 2) {
                this.emitOutput(this.name);
                this.showInfo = false;
            }
            else {
                this.infoMessage = new Message(MessageType.Error, "Nazwa musi mieć minimum 3 znaki");
                this.showInfo = true;
            }
            this.isLoaded = true;
        });
    }
    showMessage() {
        return this.showInfo == true;
    }
    messageIsWarning() {
        return Message.messageIsWarning(this.infoMessage);
    }
    messageIsSuccess() {
        return Message.messageIsSuccess(this.infoMessage);
    }
    messageIsError() {
        return Message.messageIsError(this.infoMessage);
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