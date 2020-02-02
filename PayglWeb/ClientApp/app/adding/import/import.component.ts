import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Operation } from '../../entities/Operation';
import { OperationMode } from '../manual-operation/manual-operation.component';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
    mode: OperationMode = OperationMode.Import
    fileToUpload: File = null;
    fileUploaded: boolean = false;
    loadedOperations: Operation[] = []
    currentIndex: number = 0;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload)
    }

    async uploadFile() {
        console.log(this.fileToUpload)
        await this.shared.loadOperationsFromCsv(1, this.fileToUpload);
        this.loadedOperations = this.shared.importedOperations
        console.log(this.loadedOperations)
        this.fileUploaded = true;
    }

    getOperation() {
        if (this.currentIndex <= this.loadedOperations.length && this.currentIndex >= 0)
            return this.loadedOperations[this.currentIndex]
    }

    next() {
        if (this.loadedOperations.length > this.currentIndex + 1)
            this.currentIndex++;
    }

    previous() {
        if (0 < this.currentIndex)
            this.currentIndex--;
    }
}
