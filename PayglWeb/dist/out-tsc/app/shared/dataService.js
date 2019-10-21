import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.frequencies = [];
        this.importances = [];
        this.tags = [];
        this.transactionTypes = [];
        this.transferTypes = [];
        this.operations = [];
        this.operationsGroup = [];
    }
    loadFrequencies() {
        return this.http.get("api/frequencies").toPromise();
    }
};
DataService = tslib_1.__decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=dataService.js.map