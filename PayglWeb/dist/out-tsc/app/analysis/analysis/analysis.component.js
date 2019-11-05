import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AnalysisComponent = class AnalysisComponent {
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
        return this.shared.dashboards;
    }
    onDashboardClick(o) {
        if (!this.clicked.includes(o)) {
            this.clicked = [];
            this.clicked.push(o);
        }
        else {
            this.clicked = [];
        }
    }
    isClicked(d) {
        return this.clicked.includes(d);
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