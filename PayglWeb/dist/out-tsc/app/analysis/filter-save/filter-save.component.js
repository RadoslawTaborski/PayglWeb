import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Message, MessageType } from '../templates/message/Message';
let FilterSaveComponent = class FilterSaveComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.isLoaded = false;
        this.name = "";
    }
    ngOnInit() {
        this.name = this.filter.Name;
        this.isLoaded = true;
    }
    ngOnChanges() {
        this.name = this.filter.Name;
        this.isLoaded = true;
    }
    close() {
        this.emitOutput();
    }
    emitOutput() {
        console.log("emited: finished");
        this.finishedOutput.emit(true);
    }
    save() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            if (this.name.length > 3) {
                let filterCopy = this.filter;
                filterCopy.Name = this.name;
                filterCopy.IsDirty = true;
                yield this.shared.sendFilter(filterCopy);
                this.showInfo = false;
                this.emitOutput();
            }
            else {
                this.infoMessage = new Message(MessageType.Error, "Nazwa musi mieć minimum 3 znaki");
                this.showInfo = true;
            }
            this.isLoaded = true;
        });
    }
    saveAs() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            if (this.name.length > 2) {
                let filterCopy = this.filter;
                filterCopy.Id = null;
                filterCopy.Name = this.name;
                filterCopy.IsDirty = true;
                yield this.shared.sendFilter(filterCopy);
                this.showInfo = false;
                this.emitOutput();
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
], FilterSaveComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], FilterSaveComponent.prototype, "filter", void 0);
tslib_1.__decorate([
    Output()
], FilterSaveComponent.prototype, "finishedOutput", void 0);
FilterSaveComponent = tslib_1.__decorate([
    Component({
        selector: 'app-filter-save',
        templateUrl: './filter-save.component.html',
        styleUrls: ['./filter-save.component.css']
    })
], FilterSaveComponent);
export { FilterSaveComponent };
//# sourceMappingURL=filter-save.component.js.map