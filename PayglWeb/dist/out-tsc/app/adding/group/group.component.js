import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TagRelation } from '../../entities/entities';
import { OperationsGroup } from '../../entities/OperationsGroup';
let GroupComponent = class GroupComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.isLoaded = false;
        this.description = "";
        this.date = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            this.title = "Dodaj grupę";
            this.btnName = "Dodaj";
            this.setImportModIfPossible();
            this.setEditModIfPossible();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    ngOnChanges() {
        //console.log(this.operation)
        this.setEditModIfPossible();
    }
    emitOutput(value) {
        //console.log("emited: finished")
        this.finishedOutput.emit(value);
    }
    setEditModIfPossible() {
        if (this.operationGroup == null || this.operationGroup == undefined) {
            return;
        }
        this.title = "Edytuj grupę";
        this.btnName = "Edytuj";
        this.description = this.operationGroup.Description;
        this.date = this.operationGroup.Date.substring(0, 10);
        this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operationGroup.Frequency.Id)[0];
        this.selectedImportance = this.getImportances().filter(t => t.Id == this.operationGroup.Importance.Id)[0];
        this.selectedTags = [];
        //console.log(this.operationGroup.Tags)
        for (let tag of this.operationGroup.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0]);
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
        }
    }
    setImportModIfPossible() {
        if (this.operation == null || this.operation == undefined) {
            return;
        }
        this.title = "Dodaj grupę";
        this.btnName = "Dodaj";
        this.description = this.operation.Description;
        this.date = this.operation.Date.substring(0, 10);
        if (this.operation.Frequency != null)
            this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operation.Frequency.Id)[0];
        if (this.operation.Importance != null)
            this.selectedImportance = this.getImportances().filter(t => t.Id == this.operation.Importance.Id)[0];
        this.selectedTags = [];
        //console.log(this.operation.Tags)
        for (let tag of this.operation.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0]);
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1];
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
    onTagChange(newValue) {
        //console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue);
    }
    onTagClick(toRemove) {
        //console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove);
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
    clear() {
        this.description = "";
        this.date = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
    }
    onAdd() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.selectedTags.length > 0) {
                if (this.operationGroup != undefined && this.operationGroup != null) {
                }
                else {
                    this.operationGroup = new OperationsGroup();
                }
                yield this.update(this.operationGroup);
                if (this.operation == undefined && this.operation != null) {
                    let tmp = document.getElementById("form");
                    this.clear();
                    tmp.reset();
                }
                this.emitOutput(this.operationGroup);
            }
        });
    }
    update(group) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            group.Description = this.description;
            group.User = this.shared.tmpCreatingUser();
            group.Frequency = this.selectedFrequency;
            group.Importance = this.selectedImportance;
            group.Date = this.date.toLocaleString();
            group.setTags(this.selectedTags); // TODO: message if empty
            group.IsDirty = true;
            for (let operation of group.Operations) {
                operation.Frequency = group.Frequency;
                operation.Importance = group.Importance;
                operation.setTags(group.Tags.filter(t => !t.IsMarkForDeletion).map(t => t.Tag));
                operation.IsDirty = true;
            }
            yield this.shared.sendOperationsGroup(group);
        });
    }
};
tslib_1.__decorate([
    Input()
], GroupComponent.prototype, "operationGroup", void 0);
tslib_1.__decorate([
    Input()
], GroupComponent.prototype, "operation", void 0);
tslib_1.__decorate([
    Output()
], GroupComponent.prototype, "finishedOutput", void 0);
GroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-group',
        templateUrl: './group.component.html',
        styleUrls: ['./group.component.css']
    })
], GroupComponent);
export { GroupComponent };
//# sourceMappingURL=group.component.js.map