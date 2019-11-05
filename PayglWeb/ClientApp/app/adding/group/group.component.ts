import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag, TagRelation, User, Language, Details, TransferType, TransactionType, Filter, Dashboard } from '../../entities/entities';
import { OperationsGroup } from '../../entities/OperationsGroup';
import { ApplicationStateService } from '../../shared/application-state.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
    public isLoaded: boolean = false

    public description: string = ""
    public date: Date = null
    public selectedFrequency: any = ""
    public selectedImportance: any = ""
    public selectedTag: any = ""
    public selectedTags: Tag[] = []

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        this.isLoaded = true;
        //console.log(this.isLoaded)
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

    tmpCreatingUser(): User {
        let language = new Language(1, "pl-PL", "polski")
        let userDetails = new Details(1, "Taborski", "Rados³aw");
        let user = new User(1, "rado", language, userDetails)

        return user
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
        let operationsGroup = new OperationsGroup(null, this.tmpCreatingUser(), this.description, this.selectedFrequency, this.selectedImportance, this.date.toLocaleString(), this.tagsToNewTagRelations(this.selectedTags), []);
        operationsGroup.IsDirty = true;
        await this.shared.sendOperationsGroup(operationsGroup)
        let tmp = (<HTMLFormElement>document.getElementById("form"))
        this.clear()
        tmp.reset()
    }
}
