import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag, TagRelation, User, Language, Details, TransferType, TransactionType, Filter, Dashboard } from '../../entities/entities';
import { OperationsGroup } from '../../entities/OperationsGroup';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Operation } from '../../entities/Operation';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    @Input() operationGroup: OperationsGroup
    @Output() finishedOutput = new EventEmitter();

    btnName: string;
    title: string;

    public isLoaded: boolean = false

    public description: string = ""
    public date: string = null
    public selectedFrequency: any = ""
    public selectedImportance: any = ""
    public selectedTag: any = ""
    public selectedTags: Tag[] = []

    constructor(private shared: SharedService, public state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        this.title = "Dodaj grupę"
        this.btnName = "Dodaj"
        this.setEditModIfPossible()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    ngOnChanges() {
        //console.log(this.operation)
        this.setEditModIfPossible()
    }

    emitOutput(value: any) {
        //console.log("emited: finished")
        this.finishedOutput.emit(value);
    }

    setEditModIfPossible() {
        if (this.operationGroup == null || this.operationGroup == undefined) {
            return
        }
        this.title = "Edytuj grupę"
        this.btnName = "Edytuj"
        this.description = this.operationGroup.Description
        this.date = this.operationGroup.Date.substring(0, 10)
        this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operationGroup.Frequency.Id)[0]
        this.selectedImportance = this.getImportances().filter(t => t.Id == this.operationGroup.Importance.Id)[0]
        this.selectedTags = []
        //console.log(this.operationGroup.Tags)
        for (let tag of this.operationGroup.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0])
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1]
        }
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

    tagToNewTagRelation(tag: Tag): TagRelation {
        let result = new TagRelation(null, tag);
        result.IsDirty = true

        return result
    }

    tagsToNewTagRelations(tags: Tag[]): TagRelation[] {
        let result: TagRelation[] = []
        for (let tag of tags) {
            result.push(this.tagToNewTagRelation(tag))
        }

        return result
    }

    clear() {
        this.description = ""
        this.date = null
        this.selectedFrequency = ""
        this.selectedImportance = ""
        this.selectedTag = ""
        this.selectedTags = []
    }

    async onAdd() {
        if (this.selectedTags.length > 0) {
            if (this.operationGroup != undefined && this.operationGroup != null) {
            } else {
                this.operationGroup = new OperationsGroup()
            }
            await this.update(this.operationGroup)

            this.emitOutput(this.operationGroup)

            let tmp = (<HTMLFormElement>document.getElementById("formGroup"))
            this.clear()
            if (tmp) {
                tmp.reset()
            }
        }
    }

    async update(group: OperationsGroup) {
        group.Description = this.description
        group.User = this.shared.tmpCreatingUser()
        group.Frequency = this.selectedFrequency
        group.Importance = this.selectedImportance
        group.Date = this.date.toLocaleString()
        group.setTags(this.selectedTags) // TODO: message if empty
        group.IsDirty = true;

        for (let operation of group.Operations) {
            operation.Frequency = group.Frequency
            operation.Importance = group.Importance
            operation.setTags(group.Tags.filter(t => !t.IsMarkForDeletion).map(t => t.Tag))
            operation.IsDirty = true;
        }

        await this.shared.sendOperationsGroup(group)
    }

}
