import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag, TransactionType, TransferType, OperationsGroup } from '../../entities/entities';

@Component({
    selector: 'app-manual-operation',
    templateUrl: './manual-operation.component.html',
    styleUrls: ['./manual-operation.component.css']
})
export class ManualOperationComponent implements OnInit {
    public isLoaded: boolean = false

    public selectedFrequency = 0
    public selectedImportance = 0
    public selectedTag = 0
    public selectedTags = []
    public selectedTransactionType = 0
    public selectedTransferType = 0
    public selectedOperationGroup = 0

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
        return this.shared.operationsGroups
    }

    onTagChange(newValue) {
        console.log(newValue);
        if (!this.selectedTags.includes(newValue))
            this.selectedTags.push(newValue)
    }

    onTagClick(toRemove) {
        console.log(toRemove);
        this.selectedTags = this.selectedTags.filter(obj => obj !== toRemove)
    }

    onAdd() {
        console.log(this.selectedFrequency)
    }
}
