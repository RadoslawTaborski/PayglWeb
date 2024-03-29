﻿import { Injectable } from '@angular/core';
import { User, Frequency, Importance, Tag, TransactionType, TransferType, Filter, Dashboard, Language, Details } from '../entities/entities'
import { OperationsGroup } from "../entities/OperationsGroup";
import { Operation } from "../entities/Operation";
import { DataService } from './data.service';
import { DashboardOutput } from '../entities/DashboardOutput';
import { IDashboardOutput } from '../entities/IDashboardOutput';
import { DashboardOutputLeaf } from '../entities/DashboardOutputLeaf';
import { Schematic, SchematicType } from '../entities/Schematic';
import { OperationFile } from '../entities/OperationFile';
import { Bank } from '../entities/Bank';

@Injectable()
export class SharedService {
    private isInitialize: boolean = false;
    frequencies: Frequency[] = [];
    importances: Importance[] = [];
    tags: Tag[] = [];
    transactionTypes: TransactionType[] = [];
    transferType: TransferType[] = [];
    filters: Filter[] = [];
    dashboards: Dashboard[] = [];
    operations: Operation[] = [];
    operationsGroups: OperationsGroup[] = [];
    dashboardsOutputs: IDashboardOutput[] = [];
    dashboardOutput: IDashboardOutput;
    importedOperations: Operation[] = [];
    schematics: Schematic[] = []
    banks: Bank[] = []

    constructor(private data: DataService) { }

    async loadAttributes() {
        if (!this.isInitialize) {
            this.isInitialize = true
            let tmp: any[]
            this.frequencies = []
            tmp = await this.data.loadFrequencies()
            tmp.forEach(a => this.frequencies.push(Frequency.createFromJson(a)))
            //console.log(this.frequencies);

            this.importances = []
            tmp = await this.data.loadImportances()
            tmp.forEach(a => this.importances.push(Importance.createFromJson(a)))
            //console.log(this.importances);

            this.tags = []
            tmp = await this.data.loadTags()
            tmp.forEach(a => this.tags.push(Tag.createFromJson(a)))
            //console.log(this.tags);

            this.transactionTypes = []
            tmp = await this.data.loadTransactionTypes()
            tmp.forEach(a => this.transactionTypes.push(TransactionType.createFromJson(a)))
            //console.log(this.transactionTypes);

            this.transferType = []
            tmp = await this.data.loadTransferTypes()
            tmp.forEach(a => this.transferType.push(TransferType.createFromJson(a)))
            //console.log(this.transferType);
        }
    }

    async loadFiltersAndDashboards() {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[]
        this.filters = []
        tmp = await this.data.loadFilters()
        tmp.forEach(a => this.filters.push(Filter.createFromJson(a)))

        this.dashboards = []
        tmp = await this.data.loadDashboards()
        tmp.forEach(a => this.dashboards.push(Dashboard.createFromJson(a)))
    }

    async loadSchematics() {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[]
        this.schematics = []
        tmp = await this.data.loadSchematics()
        //console.log(tmp)
        tmp.forEach(a => this.schematics.push(Schematic.createFromJson(a, this.frequencies, this.importances, this.tags)))
    }

    async loadOperationsGroups(from?: string, to?: string) {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[]
        if (from != null && to != null) {
            tmp = await this.data.loadOperationsGroups(from, to)
        } else {
            tmp = await this.data.loadOperationsGroups()
        }
        this.operationsGroups = []
        for (let group of tmp.reverse()) {
            this.operationsGroups.push(OperationsGroup.createFromJson(group, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType))
        }
    }

    async loadOperations(withoutParent?: boolean, from?: string, to?: string) {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[]
        if (from != null && to != null) {
            tmp = await this.data.loadOperations(withoutParent, from, to)
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

    async loadDashboardOutput(query?: string | number, from?: string, to?: string) {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any
        if (from != null && to != null) {
            tmp = await this.data.loadDashboardOutput(query, from, to)
        } else {
            tmp = await this.data.loadDashboardOutput(query)
        }

        if (tmp.Children === undefined) {
            this.dashboardOutput = DashboardOutputLeaf.createFromJson(tmp, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType)
        } else {
            this.dashboardOutput = DashboardOutput.createFromJson(tmp, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType)
        }
    }

    async loadDashboardsOutputs(from?: string, to?: string) {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[]
        if (from != null && to != null) {
            tmp = await this.data.loadDashboardsOutputs(from, to)
        } else {
            tmp = await this.data.loadDashboardsOutputs()
        }

        tmp.forEach(a => this.dashboardsOutputs.push(DashboardOutput.createFromJson(a, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType)))
    }

    async loadBanks() {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[]
        tmp = await this.data.loadBanks();
        tmp.forEach(a => this.banks.push(Bank.createFromJson(a)));
    }

    async sendOperation(operation: Operation) {
        this.data.sendOperation(operation)
    }

    async sendOperationsGroup(operationsGroup: OperationsGroup) {
        await this.data.sendOperationsGroup(operationsGroup)
    }

    async sendFilter(filter: Filter) {
        await this.data.sendFilter(filter)
    }

    async deleteFilter(filter: Filter) {
        await this.data.deleteFilter(filter)
    }

    async sendDashboards(boards: Dashboard[]) {
        await this.data.sendDashboards(boards)
    }

    async sendSchematics(schematics: Schematic[]) {
        await this.data.sendSchematics(schematics)
    }

    async sendSchematic(schematic: Schematic) {
        await this.data.sendSchematic(schematic)
    }

    async loadOperationsFromCsv(filesToUpload: OperationFile[]) {
        if (!this.isInitialize) {
            await this.loadAttributes()
        }
        let tmp: any[] = []
        for (let file of filesToUpload) {
            tmp.push(...await this.data.postFile(file.bankId, file.file))
        }
        this.importedOperations = []
        for (let operation of tmp) {
            this.importedOperations.push(Operation.createFromJson(operation, this.frequencies, this.importances, this.tags, this.transactionTypes, this.transferType, true))
        }
        this.importedOperations.sort((a, b) => Date.parse(a.Date) - Date.parse(b.Date))
    }

    tmpCreatingUser(): User {
        let language = new Language(1, "pl-PL", "polski")
        let userDetails = new Details(1, "Taborski", "Radosław");
        let user = new User(1, "rado", language, userDetails)

        return user
    }

    tmpSchematicType(id: number): SchematicType {
        if (id == 1) {
            return new SchematicType(id, "ignored")
        } else if (id == 2) {
            return new SchematicType(id, "schematic")
        }

        return null
    }
}