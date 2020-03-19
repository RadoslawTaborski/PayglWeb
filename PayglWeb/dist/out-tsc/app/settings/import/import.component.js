import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Schematic, SchematicContext } from '../../entities/Schematic';
let ImportComponent = class ImportComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.isLoaded = false;
        this.infoMessage = null;
        this.clickedSchematic = [];
        this.clickedGroup = 0;
        this.editSchematic = false;
        this.editedSchematic = null;
        this.schematics = [];
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadSchematics();
            this.schematics = this.shared.schematics;
            this.isLoaded = true;
        });
    }
    getIgnored() {
        //console.log(this.shared.schematics)
        return this.schematics.filter(t => t.Type.Id == 1);
    }
    getSchematics() {
        //console.log(this.shared.schematics)
        return this.schematics.filter(t => t.Type.Id == 2);
    }
    onGroupClick(idx) {
        if (this.clickedGroup == idx) {
            this.clickedGroup = 0;
        }
        else {
            this.clickedGroup = idx;
        }
    }
    isGroupClicked(idx) {
        if (this.clickedGroup == idx) {
            return true;
        }
        else {
            return false;
        }
    }
    onSchematicClick(schematic) {
        if (!this.clickedSchematic.includes(schematic)) {
            this.clickedSchematic.push(schematic);
        }
        else {
            let idx = this.clickedSchematic.indexOf(schematic);
            this.clickedSchematic.splice(idx, 1);
        }
    }
    isSchematicClicked(schematic) {
        return this.clickedSchematic.includes(schematic);
    }
    edit(schematic) {
        console.log("edit");
        this.editedSchematic = schematic;
        this.editSchematic = true;
    }
    delete(schematic) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("delete");
            if (confirm("Czy na pewno chcesz usunąć ten schemat?")) {
                this.editedSchematic = schematic;
                this.editedSchematic.IsDirty = true;
                this.editedSchematic.IsMarkForDeletion = true;
                yield this.save(this.editedSchematic);
                this.editSchematic = false;
                this.editedSchematic = null;
            }
        });
    }
    getResponse(ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (ev != null) {
                yield this.save(ev);
                if (ev.Id == null) {
                    this.schematics.push(ev);
                }
            }
            this.editSchematic = false;
            this.editedSchematic = null;
        });
    }
    save(schematic) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("save");
            yield this.shared.sendSchematic(schematic);
        });
    }
    addIgnored() {
        console.log("add");
        this.editedSchematic = new Schematic(null, null, new SchematicContext("", "", "", null, null, []), this.shared.tmpCreatingUser());
        this.editSchematic = true;
    }
};
ImportComponent = tslib_1.__decorate([
    Component({
        selector: 'app-import',
        templateUrl: './import.component.html',
        styleUrls: ['./import.component.css']
    })
], ImportComponent);
export { ImportComponent };
//# sourceMappingURL=import.component.js.map