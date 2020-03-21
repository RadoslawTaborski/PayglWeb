import { __awaiter, __decorate } from "tslib";
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
    nameIsUsed(name) {
        return this.allDashboards.map(m => m.Name).includes(name);
    }
    emitOutput(name) {
        //console.log("emited: finished")
        this.finishedOutput.emit(name);
    }
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            if (this.name.length > 2) {
                if (!this.nameIsUsed(this.name)) {
                    this.emitOutput(this.name);
                    this.showInfo = false;
                }
                else {
                    this.infoMessage = new Message(MessageType.Warning, "Nazwa jest już używana");
                    this.showInfo = true;
                }
            }
            else {
                this.infoMessage = new Message(MessageType.Warning, "Nazwa musi mieć minimum 3 znaki");
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
__decorate([
    Input()
], DashboardNewComponent.prototype, "visible", void 0);
__decorate([
    Input()
], DashboardNewComponent.prototype, "allDashboards", void 0);
__decorate([
    Output()
], DashboardNewComponent.prototype, "finishedOutput", void 0);
DashboardNewComponent = __decorate([
    Component({
        selector: 'app-dashboard-new',
        templateUrl: './dashboard-new.component.html',
        styleUrls: ['./dashboard-new.component.css']
    })
], DashboardNewComponent);
export { DashboardNewComponent };
//# sourceMappingURL=dashboard-new.component.js.map