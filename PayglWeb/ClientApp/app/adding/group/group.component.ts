import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag, TagRelation, User, Language, Details, TransferType, TransactionType } from '../../entities/entities';
import { OperationsGroup } from '../../entities/OperationsGroup';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
    public isLoaded: boolean = false

    public description: string = ""
    public amount: number = null
    public date: Date = null
    public selectedFrequency: Frequency = null
    public selectedImportance: Importance = null
    public selectedTag: Tag = null
    public selectedTags: Tag[] = []
    public selectedTransactionType: TransactionType = null
    public selectedTransferType: TransferType = null
    public selectedOperationGroup: OperationsGroup = null

    constructor(private shared: SharedService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        await this.shared.loadOperationsGroups()
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

    getTransactionTypes(): TransactionType[] {
        //console.log(this.shared.transactionTypes)
        return this.shared.transactionTypes
    }

    getTransferTypes(): TransferType[] {
        //console.log(this.shared.transferType)
        return this.shared.transferType
    }

    getOperationsGroups(): OperationsGroup[] {
        //console.log(this.shared.operationsGroups)
        return this.shared.operationsGroups.reverse()
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

    onAdd() {
        let operationsGroup = new OperationsGroup(null, this.tmpCreatingUser(), this.description, this.selectedFrequency, this.selectedImportance, this.date.toLocaleString(), this.tagsToNewTagRelations(this.selectedTags), []);
        operationsGroup.IsDirty = true;
        this.shared.sendOperationsGroup(operationsGroup)
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
}
