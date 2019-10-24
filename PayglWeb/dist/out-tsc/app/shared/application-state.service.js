import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ApplicationStateService = class ApplicationStateService {
    constructor() {
        if (window.innerWidth < 768) {
            console.log(window.innerWidth);
            this._isMobileResolution = true;
        }
        else {
            this._isMobileResolution = false;
        }
    }
    isMobileResolution() {
        return this._isMobileResolution;
    }
};
ApplicationStateService = tslib_1.__decorate([
    Injectable()
], ApplicationStateService);
export { ApplicationStateService };
//# sourceMappingURL=application-state.service.js.map