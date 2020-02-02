import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { OperationMode } from '../manual-operation/manual-operation.component';
let ImportComponent = class ImportComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.mode = OperationMode.Import;
        this.fileToUpload = null;
        this.fileUploaded = false;
        this.loadedOperations = [];
        this.currentIndex = 0;
    }
    ngOnInit() {
    }
    handleFileInput(files) {
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
    }
    uploadFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(this.fileToUpload);
            yield this.shared.loadOperationsFromCsv(1, this.fileToUpload);
            this.loadedOperations = this.shared.importedOperations;
            console.log(this.loadedOperations);
            this.fileUploaded = true;
        });
    }
    getOperation() {
        if (this.currentIndex <= this.loadedOperations.length && this.currentIndex >= 0)
            return this.loadedOperations[this.currentIndex];
    }
    next() {
        if (this.loadedOperations.length > this.currentIndex + 1)
            this.currentIndex++;
    }
    previous() {
        if (0 < this.currentIndex)
            this.currentIndex--;
    }
};
ImportComponent = tslib_1.__decorate([
    Component({
        selector: 'app-import',
        templateUrl: './import.component.html',
        styleUrls: ['./import.component.css']
    })
], ImportComponent);
export { ImportComponent };
//# sourceMappingURL=import.component.js.map