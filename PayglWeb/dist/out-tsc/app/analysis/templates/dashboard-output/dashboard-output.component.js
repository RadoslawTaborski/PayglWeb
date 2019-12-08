import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DashboardOutput } from '../../../entities/DashboardOutput';
let DashboardOutputComponent = class DashboardOutputComponent {
    constructor(state) {
        this.state = state;
        this.clicked = [];
        this.selectedPie = [];
        this.allDashboard = [];
        this.canDisplayCharts = false;
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this.allDashboard = this.getDashboards(this.dashboard);
        this.setDashboardForPieChart(this.allDashboard[0]);
    }
    getDashboardOutputItems() {
        if (this.dashboard != null) {
            return this.dashboard.Children;
        }
    }
    isExpense(o) {
        return o.TransactionType.Text == 'wydatek';
    }
    onGroupClick(o, isNested) {
        if (isNested) {
            if (!this.clicked.includes(o)) {
                this.clicked.push(o);
            }
            else {
                const index = this.clicked.indexOf(o);
                if (index !== -1) {
                    this.clicked.splice(index, 1);
                }
            }
        }
        else {
            if (!this.clicked.includes(o)) {
                this.clicked = [];
                this.clicked.push(o);
            }
            else {
                this.clicked = [];
            }
        }
    }
    getDashboards(dashboard) {
        let result = [];
        if (!(dashboard instanceof DashboardOutput)) {
            return result;
        }
        result.push(dashboard);
        for (let leaf of dashboard.Children) {
            if (!(leaf instanceof DashboardOutput)) {
                continue;
            }
            result.push(leaf);
            for (let leaf2 of leaf.Children) {
                if (leaf2 instanceof DashboardOutput) {
                    result.push(leaf2);
                }
            }
        }
        return result;
    }
    setDashboardForPieChart(dash) {
        if (!this.selectedPie.includes(dash)) {
            this.selectedPie = [];
            this.selectedPie.push(dash);
        }
    }
    isSelected(o) {
        return this.selectedPie.includes(o);
    }
    isClicked(o) {
        return this.clicked.includes(o);
    }
    displayCharts() {
        this.canDisplayCharts = !this.canDisplayCharts;
    }
};
tslib_1.__decorate([
    Input()
], DashboardOutputComponent.prototype, "dashboard", void 0);
tslib_1.__decorate([
    Input()
], DashboardOutputComponent.prototype, "dateFrom", void 0);
tslib_1.__decorate([
    Input()
], DashboardOutputComponent.prototype, "dateTo", void 0);
DashboardOutputComponent = tslib_1.__decorate([
    Component({
        selector: 'temp-dashboard',
        templateUrl: './dashboard-output.component.html',
        styleUrls: ['../templates.css']
    })
], DashboardOutputComponent);
export { DashboardOutputComponent };
//# sourceMappingURL=dashboard-output.component.js.map