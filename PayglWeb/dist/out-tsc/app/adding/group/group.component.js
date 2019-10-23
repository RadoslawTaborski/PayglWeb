import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let GroupComponent = class GroupComponent {
    constructor(shared) {
        this.shared = shared;
        this.isLoaded = false;
        this.selectedFrequency = 0;
        this.selectedImportance = 0;
        this.selectedTag = 0;
        this.selectedTags = [];
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
    onTagChange(newValue) {
        console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue);
    }
    onTagClick(toRemove) {
        console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove);
    }
    onAdd() {
        console.log(this.selectedFrequency);
    }
};
GroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-group',
        templateUrl: './group.component.html',
        styleUrls: ['./group.component.css']
    })
], GroupComponent);
export { GroupComponent };
//# sourceMappingURL=group.component.js.map