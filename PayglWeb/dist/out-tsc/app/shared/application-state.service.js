import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ApplicationStateService = class ApplicationStateService {
    constructor() {
        if (window.innerWidth < 768) {
            //console.log(window.innerWidth)
            this._type = ScreenSize.Mobile;
        }
        else {
            this._type = ScreenSize.Normal;
        }
    }
    isScreenMobile() {
        return ScreenSize.Mobile == this._type;
    }
    isScreenNormal() {
        return ScreenSize.Normal == this._type;
    }
};
ApplicationStateService = __decorate([
    Injectable()
], ApplicationStateService);
export { ApplicationStateService };
var ScreenSize;
(function (ScreenSize) {
    ScreenSize[ScreenSize["Mobile"] = 1] = "Mobile";
    ScreenSize[ScreenSize["Normal"] = 2] = "Normal";
})(ScreenSize || (ScreenSize = {}));
//# sourceMappingURL=application-state.service.js.map