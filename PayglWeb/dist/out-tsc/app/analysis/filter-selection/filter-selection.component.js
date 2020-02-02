import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Filter, Dashboard } from '../../entities/entities';
import { Message } from '../templates/message/Message';
let FilterSelectionComponent = class FilterSelectionComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.selectedItems = [];
        this.isLoaded = false;
        this.name = "";
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadFiltersAndDashboards();
            this.selectedItems = this.getNestedFiltersAndDashboards(this.selected);
            console.log(this.selectedItems);
            this.isLoaded = true;
            //console.log(this.selected)
        });
    }
    findAllFilters(output, relations) {
        for (let relation of relations) {
            if (relation.Filter instanceof Filter) {
                output.push(relation.Filter);
            }
            else if (relation.Filter instanceof Dashboard) {
                output.push(relation.Filter);
                this.findAllFilters(output, relation.Filter.Relations);
            }
        }
    }
    getNestedFiltersAndDashboards(dashboard) {
        let result = [];
        this.findAllFilters(result, dashboard.Relations);
        result.push(dashboard);
        return result;
    }
    getFilters() {
        let tmp = this.shared.filters.filter(f => !this.selectedItems.map(i => (i.Name)).includes(f.Name));
        //console.log(tmp)
        return tmp;
    }
    getDashboards() {
        let tmp = this.enableDashboards.filter(d => !d.IsVisible).filter(f => !this.selectedItems.map(i => (i.Name)).includes(f.Name));
        //console.log(tmp)
        return tmp;
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
            //console.log(this.filter)
            this.isLoaded = true;
            this.emitOutput();
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
], FilterSelectionComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], FilterSelectionComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    Input()
], FilterSelectionComponent.prototype, "enableDashboards", void 0);
tslib_1.__decorate([
    Output()
], FilterSelectionComponent.prototype, "finishedOutput", void 0);
FilterSelectionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-filter-selection',
        templateUrl: './filter-selection.component.html',
        styleUrls: ['./filter-selection.component.css']
    })
], FilterSelectionComponent);
export { FilterSelectionComponent };
//# sourceMappingURL=filter-selection.component.js.map