import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Operation } from '../../entities/Operation';
import { OperationMode } from '../manual-operation/manual-operation.component';
let ImportComponent = class ImportComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.mode = OperationMode.Import;
        this.isLoaded = false;
        this.modalVisible = false;
        this.amount = null;
        this.fileToUpload = null;
        this.fileUploaded = false;
        this.loadedOperations = [];
        this.currentIndex = 0;
        this.operation = null;
        this.fileName = "";
    }
    ngOnInit() {
        this.isLoaded = true;
    }
    ngOnChanges() {
        this.isLoaded = true;
    }
    handleFileInput(ev) {
        console.log(ev);
        this.fileToUpload = ev.files.item(0);
        this.fileName = document.getElementById("file").files[0].name;
        console.log(this.fileName);
        var nextSibling = ev.nextElementSibling;
        console.log(nextSibling);
        nextSibling.innerText = this.fileName;
        nextSibling.setAttribute("style", "color:black;");
    }
    uploadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            yield this.shared.loadOperationsFromCsv(1, this.fileToUpload);
            this.loadedOperations = this.shared.importedOperations;
            this.getOperation();
            this.fileUploaded = true;
            this.isLoaded = true;
        });
    }
    getTransactionTypes(id) {
        return this.shared.transactionTypes[id];
    }
    getTransferTypes(id) {
        return this.shared.transferType[id];
    }
    getOperation() {
        this.isLoaded = false;
        if (this.currentIndex < this.loadedOperations.length && this.currentIndex >= 0) {
            let op = this.loadedOperations[this.currentIndex];
            if (op.TransactionType === undefined) {
                op.TransactionType = this.getTransactionTypes(1);
            }
            if (op.TransferType === undefined) {
                op.TransferType = this.getTransferTypes(1);
            }
            this.operation = op;
        }
        else {
            this.fileUploaded = false;
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
        this.amount = this.loadedOperations[this.currentIndex].Amount;
        this.modalVisible = true;
    }
    getResponseFromOperation(event) {
        if (event == true) {
            this.ignore();
        }
    }
    close() {
        this.modalVisible = false;
    }
    ok() {
        let oldAmount = this.loadedOperations[this.currentIndex].Amount;
        let o = this.loadedOperations[this.currentIndex];
        if (this.amount == o.Amount) {
            return;
        }
        let op = null;
        o.Amount = this.round(this.amount);
        let description = o.Description;
        o.Description += " (part 2)";
        if (this.amount < oldAmount) {
            op = new Operation(null, o.GroupId, o.User, this.round(oldAmount - this.amount), o.TransactionType, o.TransferType, o.Frequency, o.Importance, o.Date, o.ReceiptPath, [], [], description + " (part 1)");
        }
        else {
            op = new Operation(null, o.GroupId, o.User, this.round(this.amount - oldAmount), this.getOtherTransactionType(o.TransactionType), o.TransferType, o.Frequency, o.Importance, o.Date, o.ReceiptPath, [], [], description + " (part 2)");
        }
        op.setTags(o.Tags.map(t => t.Tag));
        this.loadedOperations.splice(this.currentIndex, 0, op);
        this.loadedOperations[this.currentIndex + 1] = o;
        this.getOperation();
        this.modalVisible = false;
    }
    getOtherTransactionType(type) {
        if (type.Id == this.getTransactionTypes(1).Id) {
            return this.getTransactionTypes(0);
        }
        else {
            this.getTransactionTypes(1);
        }
    }
    round(num) {
        var str = num.toFixed(2);
        return Number(str);
    }
};
ImportComponent = __decorate([
    Component({
        selector: 'app-import',
        templateUrl: './import.component.html',
        styleUrls: ['./import.component.css']
    })
], ImportComponent);
export { ImportComponent };
//# sourceMappingURL=import.component.js.map