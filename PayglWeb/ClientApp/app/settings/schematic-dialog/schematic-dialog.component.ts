import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Schematic, SchematicType } from '../../entities/Schematic';
import { Frequency, Importance, Tag } from '../../entities/entities';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';

@Component({
    selector: 'app-schematic-dialog',
    templateUrl: './schematic-dialog.component.html',
    styleUrls: ['./schematic-dialog.component.css']
})
export class SchematicDialogComponent implements OnInit {
    @Input() visible: boolean
    @Input() schematic: Schematic
    @Output() finishedOutput = new EventEmitter<Schematic>();

    description: string = null
    titleRegex: string = null
    descriptionRegex: string = null
    public selectedFrequency: any = ""
    public selectedImportance: any = ""
    public selectedTag: any = ""
    public selectedTags: Tag[] = []
    public selectedType: number = 2

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
        console.log("onInit")
    }

    ngOnChanges() {
        if (this.visible == true) {
            console.log("onChanges")
            console.log(this.schematic)
            this.description = this.schematic.Context.Description
            this.titleRegex = this.schematic.Context.TitleRegex
            this.descriptionRegex = this.schematic.Context.DescriptionRegex
            this.selectedFrequency = this.schematic.Context.Frequency
            this.selectedImportance = this.schematic.Context.Importance
            this.selectedTags = this.schematic.Context.Tags
        }
    }

    emitOutput(schematic: Schematic) {
        console.log("emited: finished")
        this.finishedOutput.emit(schematic);
    }

    close() {
        this.emitOutput(null);
    }

    ok() {
        this.schematic.IsDirty = true
        this.schematic.Context.Description = this.description
        this.schematic.Context.TitleRegex = this.titleRegex
        this.schematic.Context.DescriptionRegex = this.descriptionRegex
        this.schematic.Context.Frequency = this.selectedFrequency
        this.schematic.Context.Importance = this.selectedImportance
        this.schematic.Context.Tags = this.selectedTags
        this.schematic.Type = this.shared.tmpSchematicType(this.selectedType)
        this.emitOutput(this.schematic);
    }

    getFrequencies(): Frequency[] {
        //console.log(this.shared.frequencies)
        return this.shared.frequencies
    }

    getImportances(): Importance[] {
        //console.log(this.shared.importances)
        return this.shared.importances
    }

    getTags(): Tag[] {
        //console.log(this.shared.tags)
        return this.shared.tags
    }

    onTagChange(newValue) {
        //console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue)
    }

    onTagClick(toRemove) {
        //console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove)
    }
}
