import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Operation } from '../../entities/Operation';
import { OperationMode } from '../manual-operation/manual-operation.component';
import { TagRelation, Tag, TransactionType, TransferType } from '../../entities/entities';

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
    fileToUpload: File = null;
    fileUploaded: boolean = false;
    loadedOperations: Operation[] = []
    currentIndex: number = 0;
    operation: Operation = null;
    fileName: string = ""

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
        this.isLoaded = true;
    }

    ngOnChanges() {
        this.isLoaded = true;
    }

    handleFileInput(ev) {
        //console.log(ev)
        this.fileToUpload = ev.files.item(0);
        this.fileName = (<HTMLInputElement>document.getElementById("file")).files[0].name;
        //console.log(this.fileName)
        var nextSibling = <HTMLLabelElement>ev.nextElementSibling
        //console.log(nextSibling)
        nextSibling.innerText = this.fileName
        nextSibling.setAttribute("style", "color:black;");
    }

    async uploadFile() {
        this.isLoaded = false;
        await this.shared.loadOperationsFromCsv(1, this.fileToUpload);
        this.loadedOperations = this.shared.importedOperations
        this.getOperation();
        this.fileUploaded = true;
        this.isLoaded = true;
    }

    getTransactionTypes(id: number): TransactionType {
        return this.shared.transactionTypes[id]
    }

    getTransferTypes(id: number): TransferType {
        return this.shared.transferType[id]
    }

    getOperation() {
        this.isLoaded = false;
        if (this.currentIndex < this.loadedOperations.length && this.currentIndex >= 0) {
            let op: Operation = this.loadedOperations[this.currentIndex];
            if (op.TransactionType === undefined) {
                op.TransactionType = this.getTransactionTypes(1)
            }
            if (op.TransferType === undefined) {
                op.TransferType = this.getTransferTypes(1)
            }

            this.operation = op;
        } else {
            this.fileUploaded = false
        }
        this.isLoaded = true;
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
