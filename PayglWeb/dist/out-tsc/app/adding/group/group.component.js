import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TagRelation, User, Language, Details } from '../../entities/entities';
import { OperationsGroup } from '../../entities/OperationsGroup';
let GroupComponent = class GroupComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
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
            yield this.shared.loadFiltersAndDashboards();
            this.getFilters();
            this.getDashboards();
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    getFilters() {
        //console.log(this.shared.filters)
        return this.shared.filters;
    }
    getDashboards() {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards;
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
    tmpCreatingUser() {
        let language = new Language(1, "pl-PL", "polski");
        let userDetails = new Details(1, "Taborski", "Rados�aw");
        let user = new User(1, "rado", language, userDetails);
        return user;
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
            let operationsGroup = new OperationsGroup(null, this.tmpCreatingUser(), this.description, this.selectedFrequency, this.selectedImportance, this.date.toLocaleString(), this.tagsToNewTagRelations(this.selectedTags), []);
            operationsGroup.IsDirty = true;
            yield this.shared.sendOperationsGroup(operationsGroup);
            let tmp = document.getElementById("form");
            this.clear();
            tmp.reset();
        });
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