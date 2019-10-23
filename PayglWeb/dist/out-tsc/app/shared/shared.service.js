import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Frequency, Importance, Tag, TransactionType, TransferType } from '../entities/entities';
import { OperationsGroup } from "../entities/OperationsGroup";
import { Operation } from "../entities/Operation";
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
                let tmp;
                this.frequencies = [];
                tmp = yield this.data.loadFrequencies();
                tmp.forEach(a => this.frequencies.push(Frequency.createFromJson(a)));
                //console.log(this.frequencies);
                this.importances = [];
                tmp = yield this.data.loadImportances();
                tmp.forEach(a => this.importances.push(Importance.createFromJson(a)));
                //console.log(this.importances);
                this.tags = [];
                tmp = yield this.data.loadTags();
                tmp.forEach(a => this.tags.push(Tag.createFromJson(a)));
                //console.log(this.tags);
                this.transactionTypes = [];
                tmp = yield this.data.loadTransactionTypes();
                tmp.forEach(a => this.transactionTypes.push(TransactionType.createFromJson(a)));
                //console.log(this.transactionTypes);
                this.transferType = [];
                tmp = yield this.data.loadTransferTypes();
                tmp.forEach(a => this.transferType.push(TransferType.createFromJson(a)));
                //console.log(this.transferType);
            }
        });
    }
    loadOperationsGroups(from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                this.loadAttributes();
            }
            let tmp;
            if (from != null && to != null) {
                tmp = yield this.data.loadOperationsGroups(from, to);
            }
            else {
                tmp = yield this.data.loadOperationsGroups();
            }
            this.operationsGroups = [];
            for (let group of tmp) {
                this.operationsGroups.push(OperationsGroup.createFromJson(group, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType));
            }
        });
    }
    loadOperations(withoutParent, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.isInitialize) {
                this.loadAttributes();
            }
            let tmp;
            if (from != null && to != null && withoutParent != null) {
                tmp = yield this.data.loadOperations(withoutParent, from, to);
            }
            else if (withoutParent != null) {
                tmp = yield this.data.loadOperations(withoutParent);
            }
            else {
                tmp = yield this.data.loadOperations();
            }
            this.operations = [];
            for (let operation of tmp) {
                this.operations.push(Operation.createFromJson(operation, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType));
            }
        });
    }
    sendOperation(operation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.data.addOperation(operation);
        });
    }
};
SharedService = tslib_1.__decorate([
    Injectable()
], SharedService);
export { SharedService };
//# sourceMappingURL=shared.service.js.map