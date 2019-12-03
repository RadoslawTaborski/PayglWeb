import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DashboardOutput } from '../../entities/DashboardOutput';
let AnalysisComponent = class AnalysisComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.isLoaded = false;
        this.clicked = [];
        this.selectedDashboard = null;
        this.output = null;
        eval("window.myService=this;");
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadFiltersAndDashboards();
            this.onDashboardClick(this.getDashboards()[0]);
            this.isLoaded = true;
        });
    }
    getDashboards() {
        return this.shared.dashboards.filter(d => d.IsVisible);
    }
    onDashboardClick(o) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.selectedDashboard = o;
            if (!this.clicked.includes(o)) {
                this.clicked = [];
                this.clicked.push(o);
                yield this.shared.loadDashboardOutput(o.Id, this.dateFrom, this.dateTo);
                this.output = this.shared.dashboardOutput;
            }
            else {
                this.clicked = [];
            }
        });
    }
    checkA() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.output != null && this.output instanceof DashboardOutput) {
                this.output.printDuplicates();
            }
        });
    }
    checkB() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.output != null && this.output instanceof DashboardOutput) {
                yield this.shared.loadDashboardOutput("", this.dateFrom, this.dateTo);
                this.output.printNotAssigned(this.shared.dashboardOutput.Result);
            }
        });
    }
    search() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            if (this.selectedDashboard != null) {
                yield this.shared.loadDashboardOutput(this.selectedDashboard.Id, this.dateFrom, this.dateTo);
                this.output = this.shared.dashboardOutput;
            }
            this.isLoaded = true;
        });
    }
};
AnalysisComponent = tslib_1.__decorate([
    Component({
        selector: 'app-analysis',
        templateUrl: './analysis.component.html',
        styleUrls: ['./analysis.component.css']
    })
], AnalysisComponent);
export { AnalysisComponent };
//# sourceMappingURL=analysis.component.js.map