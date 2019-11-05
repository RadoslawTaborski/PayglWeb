import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FiltersComponent = class FiltersComponent {
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
FiltersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-filters',
        templateUrl: './filters.component.html',
        styleUrls: ['./filters.component.css']
    })
], FiltersComponent);
export { FiltersComponent };
//# sourceMappingURL=filters.component.js.map