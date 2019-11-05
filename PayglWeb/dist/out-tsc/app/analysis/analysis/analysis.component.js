import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AnalysisComponent = class AnalysisComponent {
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
AnalysisComponent = tslib_1.__decorate([
    Component({
        selector: 'app-analysis',
        templateUrl: './analysis.component.html',
        styleUrls: ['./analysis.component.css']
    })
], AnalysisComponent);
export { AnalysisComponent };
//# sourceMappingURL=analysis.component.js.map