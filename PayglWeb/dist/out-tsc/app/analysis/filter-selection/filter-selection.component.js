import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let FilterSelectionComponent = class FilterSelectionComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.isLoaded = false;
        this.name = "";
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadFiltersAndDashboards();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    getFilters() {
        //console.log(this.shared.filters)
        return this.shared.filters;
    }
    getDashboards() {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards.filter(d => !d.IsVisible);
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
], FilterSelectionComponent.prototype, "visible", void 0);
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