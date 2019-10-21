import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ManualOperationComponent = class ManualOperationComponent {
    constructor(shared) {
        this.shared = shared;
        this.isLoaded = false;
        this.selectedFrequency = 0;
        this.selectedImportance = 0;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            this.isLoaded = true;
            console.log(this.isLoaded);
        });
    }
    getFrequencies() {
        console.log(this.shared.frequencies);
        return this.shared.frequencies;
    }
    getImportances() {
        console.log(this.shared.importances);
        return this.shared.importances;
    }
    getTags() {
        console.log(this.shared.tags);
        return this.shared.tags;
    }
    getTransactionTypes() {
        console.log(this.shared.transactionTypes);
        return this.shared.transactionTypes;
    }
    getTransferType() {
        console.log(this.shared.transferType);
        return this.shared.transferType;
    }
    onAdd() {
        console.log(this.selectedFrequency);
    }
};
ManualOperationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manual-operation',
        templateUrl: './manual-operation.component.html',
        styleUrls: ['./manual-operation.component.css']
    })
], ManualOperationComponent);
export { ManualOperationComponent };
//# sourceMappingURL=manual-operation.component.js.map