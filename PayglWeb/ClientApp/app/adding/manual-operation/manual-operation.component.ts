import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Frequency, Importance, Tag, TransactionType, TransferType, TagRelation, User, Language, Details } from '../../entities/entities';
import { OperationsGroup } from "../../entities/OperationsGroup";
import { Operation } from "../../entities/Operation";
import { ApplicationStateService } from '../../shared/application-state.service';
import { Schematic, SchematicContext } from '../../entities/Schematic';

@Component({
    selector: 'app-manual-operation',
    templateUrl: './manual-operation.component.html',
    styleUrls: ['./manual-operation.component.css']
})
export class ManualOperationComponent implements OnInit {
    @Input() operation: Operation
    @Input() mode: OperationMode
    @Output() finishedOutput = new EventEmitter<boolean>();

    title: string;
    btnName: string;

    public isLoaded: boolean = false
    public editable: boolean = true

    public description: string = ""
    public amount: number = null
    public date: string = null
    public selectedFrequency: any = ""
    public selectedImportance: any = ""
    public selectedTag: any = ""
    public selectedTags: Tag[] = []
    public selectedTransactionType: any = ""
    public selectedTransferType: any = ""
    public selectedOperationGroup: OperationsGroup = null

    public editSchematic: boolean = false
    public editedSchematic: Schematic = null

    constructor(private shared: SharedService, private state: ApplicationStateService) {
    }

    async ngOnInit() {
        await this.shared.loadAttributes()
        await this.shared.loadOperationsGroups()
        this.title = "Dodaj operację"
        this.btnName = "Dodaj"
        this.setEditModIfPossible()
        this.setImportModIfPossible()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    async ngOnChanges() {
        //console.log(this.operation)
        this.isLoaded = false
        await this.shared.loadAttributes()
        await this.shared.loadOperationsGroups()
        this.clear()
        this.setEditModIfPossible()
        this.setImportModIfPossible()
        this.isLoaded = true;
    }

    emitOutput(result: boolean) {
        console.log("emited: finished")
        this.finishedOutput.emit(result);
    }

    isAddMode(): boolean {
        console.log(this.mode, this.mode == OperationMode.Add || this.mode == null)
        return this.mode == OperationMode.Add || this.mode == null
    }

    setEditModIfPossible() {
        if (this.mode != OperationMode.Edit) {
            return
        }
        this.title = "Edytuj operację"
        this.btnName = "Edytuj"
        this.description = this.operation.Description
        this.amount = this.operation.Amount
        this.date = this.operation.Date.substring(0, 10)
        this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operation.Frequency.Id)[0]
        this.selectedImportance = this.getImportances().filter(t => t.Id == this.operation.Importance.Id)[0]
        this.selectedTransactionType = this.getTransactionTypes().filter(t => t.Id == this.operation.TransactionType.Id)[0]
        this.selectedTransferType = this.getTransferTypes().filter(t => t.Id == this.operation.TransferType.Id)[0]
        this.selectedTags = []
        for (let tag of this.operation.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0])
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1]
        }
        if (this.operation.GroupId != null) {
            this.selectedOperationGroup = this.getOperationsGroups().filter(t => t.Id == this.operation.GroupId)[0]
            this.editable = false;
        } else {
            this.editable = true;
        }
    }

    setImportModIfPossible() {
        if (this.mode != OperationMode.Import) {
            return
        }
        this.title = "Importuj operację"
        this.btnName = "Importuj"
        this.description = this.operation.Description
        this.amount = this.operation.Amount
        this.date = this.operation.Date.substring(0, 10)
        if (this.operation.Frequency!=null)
            this.selectedFrequency = this.getFrequencies().filter(t => t.Id == this.operation.Frequency.Id)[0]
        if (this.operation.Importance != null)
            this.selectedImportance = this.getImportances().filter(t => t.Id == this.operation.Importance.Id)[0]
        if (this.operation.TransactionType != null)
            this.selectedTransactionType = this.getTransactionTypes().filter(t => t.Id == this.operation.TransactionType.Id)[0]
        if (this.operation.TransferType != null)
            this.selectedTransferType = this.getTransferTypes().filter(t => t.Id == this.operation.TransferType.Id)[0]
        this.selectedTags = []
        for (let tag of this.operation.Tags) {
            this.selectedTags.push(this.getTags().filter(t => t.Id == tag.Tag.Id)[0])
        }
        if (this.selectedTags.length != 0) {
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1]
        }
        if (this.operation.GroupId != null) {
            this.selectedOperationGroup = this.getOperationsGroups().filter(t => t.Id == this.operation.GroupId)[0]
            this.editable = false;
        } else {
            this.editable = true;
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
        console.log(selectedOperationGroup, null)
        console.log(selectedOperationGroup != null)
        if (selectedOperationGroup != null) {
            console.log("here")
            this.editable = false;
            this.selectedFrequency = selectedOperationGroup.Frequency
            this.selectedImportance = selectedOperationGroup.Importance
            this.selectedTags = selectedOperationGroup.Tags.map(x => x.Tag)
            this.selectedTag = this.selectedTags[this.selectedTags.length - 1]
        } else {
            this.editable = true
        }
    }

    async onAdd() {
        if (this.selectedTags.length > 0) {
            if (this.operation != undefined && this.operation != null) {
                this.update(this.operation)
            } else {
                let operation = new Operation()
                this.update(operation)
            }

            let tmp = (<HTMLFormElement>document.getElementById("form"))
            this.clear()
            tmp.reset()

            await this.emitOutput(true)
        }
    }

    async update(operation: Operation) {
        operation.Description = this.description
        operation.Amount = this.amount
        operation.User = this.shared.tmpCreatingUser()
        operation.GroupId = this.selectedOperationGroup != null ? this.selectedOperationGroup.Id : null
        operation.TransactionType = this.selectedTransactionType
        operation.TransferType = this.selectedTransferType
        operation.Frequency = this.selectedFrequency
        operation.Importance = this.selectedImportance
        operation.Date = this.date.toLocaleString()
        operation.ReceiptPath = ""
        console.log(this.selectedTags)
        operation.setTags(this.selectedTags)
        operation.DetailsList = []
        operation.IsDirty = true;

        await this.shared.sendOperation(operation)
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

    createGroup() {
        console.log("group")
    }

    createSchematic() {
        console.log("add")
        this.editedSchematic = new Schematic(null, null, new SchematicContext("", "", "", null, null, []), this.shared.tmpCreatingUser())
        this.editSchematic = true
    }

    async getResponse($event) {
        console.log("event", $event)
        if ($event != null) {
            await this.save($event)
        }
        this.editSchematic = false;
        this.editedSchematic = null;
    }

    async save(schematic: Schematic) {
        console.log("save")
        await this.shared.sendSchematic(schematic)
    }
}

export enum OperationMode {
    Add = 0,
    Edit,
    Import
}
