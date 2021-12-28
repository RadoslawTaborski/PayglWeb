import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let SchematicDialogComponent = class SchematicDialogComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.finishedOutput = new EventEmitter();
        this.startTitle = null;
        this.startDescription = null;
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
        //console.log("onInit")
    }
    ngOnChanges() {
        if (this.visible == true) {
            //console.log("onChanges")
            //console.log(this.schematic)
            if (this.schematic.Context.Description) {
                this.description = this.schematic.Context.Description;
                this.selectedType = 2;
                let intiValues = this.schematic.Context.Description.split('; ');
                if (intiValues.length === 2) {
                    this.startTitle = intiValues[1];
                    this.startDescription = intiValues[0];
                }
                else {
                    this.startTitle = this.schematic.Context.Description;
                    this.startDescription = "";
                }
                this.selectedFrequency = this.schematic.Context.Frequency;
                this.selectedImportance = this.schematic.Context.Importance;
                this.selectedTags = this.schematic.Context.Tags;
            }
            else {
                this.selectedType = 1;
            }
            this.titleRegex = this.schematic.Context.TitleRegex;
            this.descriptionRegex = this.schematic.Context.DescriptionRegex;
        }
    }
    emitOutput(schematic) {
        //console.log("emited: finished")
        this.finishedOutput.emit(schematic);
    }
    close() {
        this.emitOutput(null);
    }
    ok() {
        this.schematic.IsDirty = true;
        this.schematic.Type = this.shared.tmpSchematicType(this.selectedType);
        this.schematic.Context.TitleRegex = this.titleRegex;
        this.schematic.Context.DescriptionRegex = this.descriptionRegex;
        //console.log(this.schematic, this.selectedType == 2, this.selectedType === 2, this.selectedType == 1, this.selectedType === 1)
        if (this.selectedType == 2) {
            this.schematic.Context.Description = this.description;
            this.schematic.Context.Frequency = this.selectedFrequency;
            this.schematic.Context.Importance = this.selectedImportance;
            this.schematic.Context.Tags = this.selectedTags;
        }
        //console.log(this.selectedType)
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
    regexIsCorrect(regex, value) {
        try {
            const reg = new RegExp(regex);
            if (value) {
                if (reg.test(value)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (reg.test("")) {
                return true;
            }
        }
        catch (_a) {
            return false;
        }
        return true;
    }
    ;
    isPrepared() {
        if (this.selectedType === 2) {
            if (!this.description) {
                return false;
            }
        }
        if (!this.titleRegex && !this.descriptionRegex) {
            return false;
        }
        if (this.descriptionRegex && !this.regexIsCorrect(this.descriptionRegex, this.startDescription)) {
            return false;
        }
        if (this.titleRegex && !this.regexIsCorrect(this.titleRegex, this.startTitle)) {
            return false;
        }
        return true;
    }
};
__decorate([
    Input()
], SchematicDialogComponent.prototype, "visible", void 0);
__decorate([
    Input()
], SchematicDialogComponent.prototype, "schematic", void 0);
__decorate([
    Output()
], SchematicDialogComponent.prototype, "finishedOutput", void 0);
SchematicDialogComponent = __decorate([
    Component({
        selector: 'app-schematic-dialog',
        templateUrl: './schematic-dialog.component.html',
        styleUrls: ['./schematic-dialog.component.css']
    })
], SchematicDialogComponent);
export { SchematicDialogComponent };
//# sourceMappingURL=schematic-dialog.component.js.map