import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Operation } from "../../entities/Operation";
let ManualOperationComponent = class ManualOperationComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.isLoaded = false;
        this.editable = true;
        this.description = "";
        this.amount = null;
        this.date = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
        this.selectedTransactionType = "";
        this.selectedTransferType = "";
        this.selectedOperationGroup = null;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            yield this.shared.loadOperationsGroups();
            this.title = "Dodaj operację";
            this.btnName = "Dodaj";
            this.setEditModIfPossible();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    ngOnChanges() {
        //console.log(this.operation)
        this.setEditModIfPossible();
    }
    emitOutput() {
        console.log("emited: finished");
        this.finishedOutput.emit(true);
    }
    setEditModIfPossible() {
        if (this.operation == null || this.operation == undefined) {
            return;
        }
        this.title = "Edytuj operację";
        this.btnName = "Edytuj";
        this.description = this.operation.Description;
        this.amount = this.operation.Amount;
        this.date = this.operation.Date.substring(0, 10);
        this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operation.Frequency.Id)[0];
        this.selectedImportance = this.getImportances().filter(t => t.Id == this.operation.Importance.Id)[0];
        this.selectedTransactionType = this.getTransactionTypes().filter(t => t.Id == this.operation.TransactionType.Id)[0];
        this.selectedTransferType = this.getTransferTypes().filter(t => t.Id == this.operation.TransferType.Id)[0];
        this.selectedTags = [];
        console.log(this.operation.Tags);
        for (let tag of this.operation.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0]);
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
        }
        if (this.operation.GroupId != null) {
            this.selectedOperationGroup = this.getOperationsGroups().filter(t => t.Id == this.operation.GroupId)[0];
            this.editable = false;
        }
        else {
            this.editable = true;
        }
    }
    getFrequencies() {
        //console.log(this.shared.frequencies)
        return this.shared.frequencies;
    }
    getImportances() {
        //console.log(this.shared.importances)
        return this.shared.importances;
    }
    getTags() {
        //console.log(this.shared.tags)
        return this.shared.tags;
    }
    getTransactionTypes() {
        //console.log(this.shared.transactionTypes)
        return this.shared.transactionTypes;
    }
    getTransferTypes() {
        //console.log(this.shared.transferType)
        return this.shared.transferType;
    }
    getOperationsGroups() {
        //console.log(this.shared.operationsGroups)
        return this.shared.operationsGroups.reverse();
    }
    onTagChange(newValue) {
        //console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue);
    }
    onTagClick(toRemove) {
        //console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove);
    }
    onGroupChange(selectedOperationGroup) {
        console.log(selectedOperationGroup, null);
        console.log(selectedOperationGroup != null);
        if (selectedOperationGroup != null) {
            console.log("here");
            this.editable = false;
            this.selectedFrequency = selectedOperationGroup.Frequency;
            this.selectedImportance = selectedOperationGroup.Importance;
            this.selectedTags = selectedOperationGroup.Tags.map(x => x.Tag);
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
        }
        else {
            this.editable = true;
        }
    }
    onAdd() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.selectedTags.length > 0) {
                if (this.operation != undefined && this.operation != null) {
                    this.update(this.operation);
                }
                else {
                    let operation = new Operation();
                    this.update(operation);
                }
                let tmp = document.getElementById("form");
                this.clear();
                tmp.reset();
                yield this.emitOutput();
            }
        });
    }
    update(operation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            operation.Description = this.description;
            operation.Amount = this.amount;
            operation.User = this.shared.tmpCreatingUser();
            operation.GroupId = this.selectedOperationGroup != null ? this.selectedOperationGroup.Id : null;
            operation.TransactionType = this.selectedTransactionType;
            operation.TransferType = this.selectedTransferType;
            operation.Frequency = this.selectedFrequency;
            operation.Importance = this.selectedImportance;
            operation.Date = this.date.toLocaleString();
            operation.ReceiptPath = "";
            operation.setTags(this.selectedTags);
            operation.DetailsList = [];
            operation.IsDirty = true;
            yield this.shared.sendOperation(operation);
        });
    }
    clear() {
        this.description = "";
        this.amount = null;
        this.date = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
        this.selectedTransactionType = "";
        this.selectedTransferType = "";
        this.selectedOperationGroup = null;
        this.editable = true;
    }
};
tslib_1.__decorate([
    Input()
], ManualOperationComponent.prototype, "operation", void 0);
tslib_1.__decorate([
    Output()
], ManualOperationComponent.prototype, "finishedOutput", void 0);
ManualOperationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manual-operation',
        templateUrl: './manual-operation.component.html',
        styleUrls: ['./manual-operation.component.css']
    })
], ManualOperationComponent);
export { ManualOperationComponent };
//# sourceMappingURL=manual-operation.component.js.map