import { Injectable } from '@angular/core';
import { User, Frequency, Importance, Tag, TransactionType, TransferType, OperationsGroup, Operation } from '../entities/entities'
import { DataService } from './data.service';

@Injectable()
export class SharedService {
    private isInitialize: boolean = false;
    frequencies: Frequency[] = [];
    importances: Importance[] = [];
    tags: Tag[] = [];
    transactionTypes: TransactionType[] = [];
    transferType: TransferType[] = [];
    operations: Operation[] = [];
    operationsGroups: OperationsGroup[] = [];

    constructor(private data: DataService) { }

    async loadAttributes() {
        if (!this.isInitialize) {
            this.frequencies = await this.data.loadFrequencies();
            this.importances = await this.data.loadImportances();
            this.tags = await this.data.loadTags();
            this.transactionTypes = await this.data.loadTransactionTypes();
            this.transferType = await this.data.loadTransferTypes();
        }
    }

    async loadOperationsGroups(from?: Date, to?: Date) {
        if (from != null && to != null) {
            this.operationsGroups = await this.data.loadOperationsGroups(from, to)
        } else {
            this.operationsGroups = await this.data.loadOperationsGroups()
        }
    }

    async loadOperations(withoutParent?: boolean, from?: Date, to?: Date) {
        if (from != null && to != null && withoutParent != null) {
            this.operations = await this.data.loadOperations(withoutParent, from, to)
        } else if (withoutParent != null) {
            this.operations = await this.data.loadOperations(withoutParent)
        } else {
            this.operations = await this.data.loadOperations()
        }
    }
}