import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag, TransactionType, TransferType, TagRelation, User, Language, Details } from '../../entities/entities';
import { OperationsGroup } from "../../entities/OperationsGroup";
import { Operation } from "../../entities/Operation";
import { ApplicationStateService } from '../../shared/application-state.service';

@Component({
    selector: 'app-manual-operation',
    templateUrl: './manual-operation.component.html',
    styleUrls: ['./manual-operation.component.css']
})
export class ManualOperationComponent implements OnInit {
    public isLoaded: boolean = false
    public editable: boolean = true

    public description: string = ""
    public amount: number = null
    public date: Date = null
    public selectedFrequency: any = ""
    public selectedImportance: any = ""
    public selectedTag: any = ""
    public selectedTags: Tag[] = []
    public selectedTransactionType: any = ""
    public selectedTransferType: any = ""
    public selectedOperationGroup: OperationsGroup = null

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

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

    onGroupChange(selectedOperationGroup: OperationsGroup) {
        console.log(selectedOperationGroup)
        if (selectedOperationGroup != null) {
            this.editable = false;
            this.selectedFrequency = selectedOperationGroup.Frequency
            this.selectedImportance = selectedOperationGroup.Importance
            this.selectedTags = selectedOperationGroup.Tags.map(x => x.Tag)
            this.selectedTag = this.selectedTags[this.selectedTags.length-1]
        } else {
            this.editable=true
        }
    }

    async onAdd() {
        let operation = new Operation(null, this.selectedOperationGroup == null ? null : this.selectedOperationGroup.Id, this.tmpCreatingUser(), this.amount, this.selectedTransactionType, this.selectedTransferType, this.selectedFrequency, this.selectedImportance, this.date.toLocaleString(), "", this.tagsToNewTagRelations(this.selectedTags), [], this.description);
        operation.IsDirty = true;
        await this.shared.sendOperation(operation)
        let tmp = (<HTMLFormElement>document.getElementById("form"))
        this.clear()
        tmp.reset()
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
        this.amount = null
        this.date = null
        this.selectedFrequency = ""
        this.selectedImportance = ""
        this.selectedTag = ""
        this.selectedTags = []
        this.selectedTransactionType = ""
        this.selectedTransferType = ""
        this.selectedOperationGroup = null

        this.editable = true
    }
}
