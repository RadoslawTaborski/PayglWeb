import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TagRelation, User, Language, Details } from '../../entities/entities';
import { Operation } from "../../entities/Operation";
let ManualOperationComponent = class ManualOperationComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
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
    onGroupChange(selectedOperationGroup) {
        console.log(selectedOperationGroup);
        if (selectedOperationGroup != null) {
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
            let operation = new Operation(null, this.selectedOperationGroup == null ? null : this.selectedOperationGroup.Id, this.tmpCreatingUser(), this.amount, this.selectedTransactionType, this.selectedTransferType, this.selectedFrequency, this.selectedImportance, this.date.toLocaleString(), "", this.tagsToNewTagRelations(this.selectedTags), [], this.description);
            operation.IsDirty = true;
            yield this.shared.sendOperation(operation);
            let tmp = document.getElementById("form");
            this.clear();
            tmp.reset();
        });
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
    tmpCreatingUser() {
        let language = new Language(1, "pl-PL", "polski");
        let userDetails = new Details(1, "Taborski", "Rados�aw");
        let user = new User(1, "rado", language, userDetails);
        return user;
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
ManualOperationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manual-operation',
        templateUrl: './manual-operation.component.html',
        styleUrls: ['./manual-operation.component.css']
    })
], ManualOperationComponent);
export { ManualOperationComponent };
//# sourceMappingURL=manual-operation.component.js.map