import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Filter } from '../../entities/entities';
let DashboardsComponent = class DashboardsComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.isLoaded = false;
        this.clicked = [];
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadFiltersAndDashboards();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    getDashboards() {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards;
    }
    onDashboardClick(o) {
        if (!this.clicked.includes(o)) {
            this.clicked.push(o);
        }
        else {
            const index = this.clicked.indexOf(o, 0);
            if (index > -1) {
                this.clicked.splice(index, 1);
            }
        }
    }
    isClicked(o) {
        return this.clicked.includes(o);
    }
    isFilter(f) {
        return (f instanceof Filter);
    }
};
DashboardsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboards',
        templateUrl: './dashboards.component.html',
        styleUrls: ['./dashboards.component.css']
    })
], DashboardsComponent);
export { DashboardsComponent };
//# sourceMappingURL=dashboards.component.js.map