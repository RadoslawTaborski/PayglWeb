import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SchematicType } from '../../entities/Schematic';
let SchematicDialogComponent = class SchematicDialogComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.description = null;
        this.titleRegex = null;
        this.descriptionRegex = null;
        this.selectedFrequency = "";
        this.selectedImportance = "";
        this.selectedTag = "";
        this.selectedTags = [];
        this.selectedType = 2;
    }
    ngOnInit() {
        console.log("onInit");
    }
    ngOnChanges() {
        if (this.visible == true) {
            console.log("onChanges");
            console.log(this.schematic);
            this.description = this.schematic.Context.Description;
            this.titleRegex = this.schematic.Context.TitleRegex;
            this.descriptionRegex = this.schematic.Context.DescriptionRegex;
            this.selectedFrequency = this.schematic.Context.Frequency;
            this.selectedImportance = this.schematic.Context.Importance;
            this.selectedTags = this.schematic.Context.Tags;
        }
    }
    emitOutput(schematic) {
        console.log("emited: finished");
        this.finishedOutput.emit(schematic);
    }
    close() {
        this.emitOutput(null);
    }
    ok() {
        this.schematic.IsDirty = true;
        this.schematic.Context.Description = this.description;
        this.schematic.Context.TitleRegex = this.titleRegex;
        this.schematic.Context.DescriptionRegex = this.descriptionRegex;
        this.schematic.Context.Frequency = this.selectedFrequency;
        this.schematic.Context.Importance = this.selectedImportance;
        this.schematic.Context.Tags = this.selectedTags;
        this.schematic.Type = new SchematicType(this.selectedType, "todo"); //TODO:
        this.emitOutput(this.schematic);
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
};
tslib_1.__decorate([
    Input()
], SchematicDialogComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input()
], SchematicDialogComponent.prototype, "schematic", void 0);
tslib_1.__decorate([
    Output()
], SchematicDialogComponent.prototype, "finishedOutput", void 0);
SchematicDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-schematic-dialog',
        templateUrl: './schematic-dialog.component.html',
        styleUrls: ['./schematic-dialog.component.css']
    })
], SchematicDialogComponent);
export { SchematicDialogComponent };
//# sourceMappingURL=schematic-dialog.component.js.map