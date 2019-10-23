import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TagRelation } from '../../entities/entities';
import { Operation } from "../../entities/Operation";
let ManualOperationComponent = class ManualOperationComponent {
    constructor(shared) {
        this.shared = shared;
        this.isLoaded = false;
        this.description = "";
        this.amount = null;
        this.date = null;
        this.selectedFrequency = null;
        this.selectedImportance = null;
        this.selectedTag = null;
        this.selectedTags = [];
        this.selectedTransactionType = null;
        this.selectedTransferType = null;
        this.selectedOperationGroup = null;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            yield this.shared.loadOperationsGroups();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
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
    onAdd() {
        let operation = new Operation(null, this.selectedOperationGroup == null ? null : this.selectedOperationGroup.Id, null, this.amount, this.selectedTransactionType, this.selectedTransferType, this.selectedFrequency, this.selectedImportance, this.date.toLocaleString(), "", this.tagsToNewTagRelations(this.selectedTags), [], this.description);
        operation.IsDirty = true;
        this.shared.sendOperation(operation);
    }
    tagToNewTagRelation(tag) {
        let result = new TagRelation(null, tag);
        result.IsDirty = true;
        return result;
    }
    tagsToNewTagRelations(tags) {
        let result = [];
        for (let tag of tags) {
            result.push(this.tagToNewTagRelation(tag));
        }
        return result;
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