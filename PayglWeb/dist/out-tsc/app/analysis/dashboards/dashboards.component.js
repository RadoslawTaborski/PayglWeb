import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let DashboardsComponent = class DashboardsComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.isLoaded = false;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
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