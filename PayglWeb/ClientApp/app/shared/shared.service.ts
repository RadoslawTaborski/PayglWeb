﻿import { Injectable } from '@angular/core';
import { User, Frequency, Importance, Tag, TransactionType, TransferType } from '../entities/entities'
import { OperationsGroup } from "../entities/OperationsGroup";
import { Operation } from "../entities/Operation";
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
            this.isInitialize = true
            let tmp: any[]
            this.frequencies=[]
            tmp = await this.data.loadFrequencies()
            tmp.forEach(a => this.frequencies.push(Frequency.createFromJson(a)))
            //console.log(this.frequencies);

            this.importances=[]
            tmp = await this.data.loadImportances()
            tmp.forEach(a => this.importances.push(Importance.createFromJson(a)))
            //console.log(this.importances);

            this.tags=[]
            tmp = await this.data.loadTags()
            tmp.forEach(a => this.tags.push(Tag.createFromJson(a)))
            //console.log(this.tags);

            this.transactionTypes=[]
            tmp = await this.data.loadTransactionTypes()
            tmp.forEach(a => this.transactionTypes.push(TransactionType.createFromJson(a)))
            //console.log(this.transactionTypes);

            this.transferType=[]
            tmp = await this.data.loadTransferTypes()
            tmp.forEach(a => this.transferType.push(TransferType.createFromJson(a)))
            //console.log(this.transferType);
        }
    }

    async loadOperationsGroups(query?: string, from?: Date, to?: Date) {
        if (!this.isInitialize) {
            this.loadAttributes()
        }
        let tmp: any[]
        if (from != null && to != null && query != null) {
            tmp = await this.data.loadOperationsGroups(query, from, to)
        } else if (query != null) {
            tmp = await this.data.loadOperationsGroups(query)
        } else {
            tmp = await this.data.loadOperationsGroups()
        }
        this.operationsGroups = []
        for (let group of tmp.reverse()) {
            this.operationsGroups.push(OperationsGroup.createFromJson(group, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType))
        }
    }

    async loadOperations(withoutParent?: boolean, query?:string, from?: Date, to?: Date) {
        if (!this.isInitialize) {
            this.loadAttributes()
        }
        let tmp: any[]
        if (from != null && to != null && query != null) {
            tmp = await this.data.loadOperations(withoutParent, query, from, to)
        } else if (from != null && to != null && withoutParent != null) {
            tmp = await this.data.loadOperations(withoutParent, null, from, to)
        } else if (query != null) {
            tmp = await this.data.loadOperations(true, query)
        } else if (withoutParent != null) {
            tmp = await this.data.loadOperations(withoutParent)
        } else {
            tmp = await this.data.loadOperations()
        }
        this.operations = []
        for (let operation of tmp.reverse()) {
            this.operations.push(Operation.createFromJson(operation, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType))
        } 
    }

    async sendOperation(operation: Operation) {
        this.data.sendOperation(operation)
    }

    async sendOperationsGroup(operationsGroup: OperationsGroup) {
        this.data.sendOperationsGroup(operationsGroup)
    }
}