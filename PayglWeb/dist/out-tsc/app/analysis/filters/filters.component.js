import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let FiltersComponent = class FiltersComponent {
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
    getFilters() {
        //console.log(this.shared.filters)
        return this.shared.filters;
    }
    onFilterClick(o) {
        if (!this.clicked.includes(o)) {
            this.clicked = [];
            this.clicked.push(o);
        }
        else {
            this.clicked = [];
        }
    }
    isClicked(o) {
        return this.clicked.includes(o);
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