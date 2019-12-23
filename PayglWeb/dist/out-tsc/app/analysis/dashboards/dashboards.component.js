import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Filter } from '../../entities/entities';
import { moveItemInArray } from '@angular/cdk/drag-drop';
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
        console.log("click");
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
    drop(event, array) {
        console.log("here");
        moveItemInArray(array, event.previousIndex, event.currentIndex);
    }
    addFilter(o) {
        console.log("addFilter");
        this.showFilterAddMode = true;
    }
    getResponseFromAddFilter($event) {
        this.showFilterAddMode = false;
    }
    addDashboard() {
        this.showDashboardAddMode = true;
    }
    getResponseFromNewDashboard($event) {
        this.showDashboardAddMode = false;
    }
    delete(o) {
        console.log("delete");
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