import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Operation } from '../../entities/Operation';
import { OperationMode } from '../manual-operation/manual-operation.component';
import { OperationFile } from '../../entities/OperationFile';
let ImportComponent = class ImportComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.mode = OperationMode.Import;
        this.isLoaded = false;
        this.modalVisible = false;
        this.amount = null;
        this.filesToUpload = [];
        this.filesAdded = false;
        this.filesUploaded = false;
        this.loadedOperations = [];
        this.currentIndex = 0;
        this.operation = null;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadBanks();
            this.isLoaded = true;
        });
    }
    ngOnChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            this.shared.loadBanks();
            this.isLoaded = true;
        });
    }
    getBanks() {
        return this.shared.banks;
    }
    handleFileInput(ev) {
        //console.log(ev)
        for (let file of ev.files) {
            this.filesToUpload.push(new OperationFile(this.defaultBank(file.name), file.name, file));
        }
        this.filesAdded = true;
    }
    uploadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.filesToUpload.length > 0) {
                this.isLoaded = false;
                yield this.shared.loadOperationsFromCsv(this.filesToUpload);
                this.loadedOperations = this.shared.importedOperations;
                this.getOperation();
                this.filesAdded = false;
                this.filesUploaded = true;
                this.isLoaded = true;
            }
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
        if (this.loadedOperations.length == 0) {
            this.filesUploaded = false;
            this.isLoaded = true;
            return;
        }
        if (this.currentIndex >= this.loadedOperations.length) {
            this.currentIndex = this.loadedOperations.length - 1;
        }
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }
        let op = this.loadedOperations[this.currentIndex];
        if (op.TransactionType === undefined) {
            op.TransactionType = this.getTransactionTypes(1);
        }
        if (op.TransferType === undefined) {
            op.TransferType = this.getTransferTypes(1);
        }
        this.operation = op;
        this.isLoaded = true;
    }
    defaultBank(fileName) {
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