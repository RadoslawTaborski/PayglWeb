import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Operation } from '../../entities/Operation';
import { OperationMode } from '../manual-operation/manual-operation.component';
import { TagRelation, Tag, TransactionType, TransferType } from '../../entities/entities';
import { OperationFile } from '../../entities/OperationFile';
import { Bank } from '../../entities/Bank';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
    mode: OperationMode = OperationMode.Import

    public isLoaded: boolean = false
    public modalVisible: boolean = false
    public amount: number = null
    filesToUpload: OperationFile[] = [];
    filesAdded: boolean = false;
    filesUploaded: boolean = false;
    loadedOperations: Operation[] = []
    currentIndex: number = 0;
    operation: Operation = null;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadBanks();
        this.isLoaded = true;
    }

    async ngOnChanges() { 
        this.shared.loadBanks();
        this.isLoaded = true;
    }

    getBanks(): Bank[] {
        return this.shared.banks;
    }

    handleFileInput(ev) {
        //console.log(ev)
        for (let file of ev.files) {
            this.filesToUpload.push(new OperationFile(this.defaultBank(file.name), file.name, file));
        }
        this.filesAdded = true;
    }

    async uploadFile() {
        if (this.filesToUpload.length > 0) {
            this.isLoaded = false;
            await this.shared.loadOperationsFromCsv(this.filesToUpload);
            this.loadedOperations = this.shared.importedOperations
            this.getOperation();
            this.filesAdded = false;
            this.filesUploaded = true;
            this.isLoaded = true;
        }
    }

    getTransactionTypes(id: number): TransactionType {
        return this.shared.transactionTypes[id]
    }

    getTransferTypes(id: number): TransferType {
        return this.shared.transferType[id]
    }

    getOperation() {
        this.isLoaded = false;
        if (this.loadedOperations.length == 0) {
            this.filesUploaded = false
            this.isLoaded = true;
            return
        }
        if (this.currentIndex >= this.loadedOperations.length) {
            this.currentIndex = this.loadedOperations.length - 1;
        }
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }

        let op: Operation = this.loadedOperations[this.currentIndex];
        if (op.TransactionType === undefined) {
            op.TransactionType = this.getTransactionTypes(1)
        }
        if (op.TransferType === undefined) {
            op.TransferType = this.getTransferTypes(1)
        }

        this.operation = op;

        this.isLoaded = true;
    }

    defaultBank(fileName: string): number {
        if (fileName.startsWith('Lista_transakcji')) {
            return this.getBanks().filter(x => x.Name == "ING")[0].Id;
        }
        if (fileName.startsWith('Historia_transakcji')) {
            return this.getBanks().filter(x => x.Name == "Millennium")[0].Id;
        }
        if (fileName.startsWith('account-statement')) {
            return this.getBanks().filter(x => x.Name == "Revolut")[0].Id;
        }
        return 1;
    }

    next() {
        if (this.loadedOperations.length > this.currentIndex + 1)
            this.currentIndex++;
        this.getOperation();
    }

    previous() {
        if (0 < this.currentIndex)
            this.currentIndex--;
        this.getOperation();
    }

    ignore() {
        this.loadedOperations.splice(this.currentIndex, 1);
        this.getOperation();
    }

    split() {
        this.amount = this.loadedOperations[this.currentIndex].Amount
        this.modalVisible = true;
    }

    getResponseFromOperation(event: boolean) {
        if (event == true) {
            this.ignore()
        }
    }

    close() {
        this.modalVisible = false;
    }

    ok() {
        let oldAmount: number = this.loadedOperations[this.currentIndex].Amount;
        let o = this.loadedOperations[this.currentIndex];
        if (this.amount == o.Amount) {
            return;
        }

        let op: Operation = null;
        o.Amount = this.round(this.amount);
        let description: string = o.Description
        o.Description += " (part 2)"
        if (this.amount < oldAmount) {
            op = new Operation(null, o.GroupId, o.User, this.round(oldAmount - this.amount), o.TransactionType, o.TransferType, o.Frequency, o.Importance, o.Date, o.ReceiptPath, [], [], description + " (part 1)");
        } else {
            op = new Operation(null, o.GroupId, o.User, this.round(this.amount - oldAmount), this.getOtherTransactionType(o.TransactionType), o.TransferType, o.Frequency, o.Importance, o.Date, o.ReceiptPath, [], [], description + " (part 2)");
        }
        op.setTags(o.Tags.map(t => t.Tag));
        this.loadedOperations.splice(this.currentIndex, 0, op);
        this.loadedOperations[this.currentIndex + 1] = o

        this.getOperation();

        this.modalVisible = false;
    }

    getOtherTransactionType(type: TransactionType): TransactionType {
        if (type.Id == this.getTransactionTypes(1).Id) {
            return this.getTransactionTypes(0)
        } else {
            this.getTransactionTypes(1)
        }
    }

    round(num: number): number {
        var str = num.toFixed(2);
        return Number(str);
    }
}
