import { Component, OnInit } from '@angular/core';
import { Message } from '../../analysis/templates/message/Message';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Schematic, SchematicContext } from '../../entities/Schematic';
import { Frequency, Importance, Tag } from '../../entities/entities';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
    public isLoaded: boolean = false
    public infoMessage: Message = null
    public clickedSchematic: Schematic[] = []
    public clickedGroup: number = 0;
    public editSchematic: boolean = false
    public editedSchematic: Schematic = null
    public schematics: Schematic[] = [];

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadSchematics();
        this.schematics = this.shared.schematics;
        this.isLoaded = true;
    }

    getIgnored(): Schematic[] {
        //console.log(this.shared.schematics)
        return this.schematics.filter(t => t.Type.Id == 1);
    }

    getSchematics(): Schematic[] {
        //console.log(this.shared.schematics)
        return this.schematics.filter(t => t.Type.Id == 2);
    }

    onGroupClick(idx: number) {
        if (this.clickedGroup == idx) {
            this.clickedGroup = 0;
        } else {
            this.clickedGroup = idx;
        }
    }

    isGroupClicked(idx: number): boolean {
        if (this.clickedGroup == idx) {
            return true
        } else {
            return false;
        }
    }

    onSchematicClick(schematic: Schematic) {
        if (!this.clickedSchematic.includes(schematic)) {
            this.clickedSchematic.push(schematic);
        } else {
            let idx = this.clickedSchematic.indexOf(schematic)
            this.clickedSchematic.splice(idx, 1);
        }
    }

    isSchematicClicked(schematic: Schematic): boolean {
        return this.clickedSchematic.includes(schematic);
    }

    edit(schematic: Schematic) {
        //console.log("edit")
        this.editedSchematic = schematic
        this.editSchematic = true
    }

    async delete(schematic: Schematic) {
        //console.log("delete")
        if (confirm("Czy na pewno chcesz usunąć ten schemat?")) {
            this.editedSchematic = schematic
            this.editedSchematic.IsDirty = true
            this.editedSchematic.IsMarkForDeletion = true
            await this.save(this.editedSchematic)
            this.editSchematic = false;
            this.editedSchematic = null;
        }
    }

    async getResponse(ev) {
        if (ev != null) {
            await this.save(ev)
            if (ev.Id == null) {
                this.schematics.push(ev)
            }
        }
        this.editSchematic = false;
        this.editedSchematic = null;
    }

    async save(schematic: Schematic) {
        //console.log("save")
        await this.shared.sendSchematic(schematic)
    }

    addIgnored() {
        // console.log("add")
        this.editedSchematic = new Schematic(null, null, new SchematicContext("", "", "", null, null, []), this.shared.tmpCreatingUser())
        this.editSchematic = true
    }
}
