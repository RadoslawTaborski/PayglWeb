import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let SharedService = class SharedService {
    constructor(data) {
        this.data = data;
        this.isInitialize = false;
        this.frequencies = [];
        this.importances = [];
        this.tags = [];
        this.transactionTypes = [];
        this.transferType = [];
        this.operations = [];
        this.operationsGroups = [];
    }
    loadAttributes() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                this.frequencies = yield this.data.loadFrequencies();
                this.importances = yield this.data.loadImportances();
                this.tags = yield this.data.loadTags();
                this.transactionTypes = yield this.data.loadTransactionTypes();
                this.transferType = yield this.data.loadTransferTypes();
            }
        });
    }
    loadOperationsGroups(from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (from != null && to != null) {
                this.operationsGroups = yield this.data.loadOperationsGroups(from, to);
            }
            else {
                this.operationsGroups = yield this.data.loadOperationsGroups();
            }
        });
    }
    loadOperations(withoutParent, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (from != null && to != null && withoutParent != null) {
                this.operations = yield this.data.loadOperations(withoutParent, from, to);
            }
            else if (withoutParent != null) {
                this.operations = yield this.data.loadOperations(withoutParent);
            }
            else {
                this.operations = yield this.data.loadOperations();
            }
        });
    }
};
SharedService = tslib_1.__decorate([
    Injectable()
], SharedService);
export { SharedService };
//# sourceMappingURL=shared.service.js.map