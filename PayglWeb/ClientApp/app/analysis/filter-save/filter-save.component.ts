import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Filter } from '../../entities/entities';
import { ApplicationStateService } from '../../shared/application-state.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-filter-save',
  templateUrl: './filter-save.component.html',
  styleUrls: ['./filter-save.component.css']
})
export class FilterSaveComponent implements OnInit {
    @Input() visible: boolean
    @Input() filter: Filter
    @Output() finishedOutput = new EventEmitter<boolean>();

    isLoaded: boolean = false;
    name: string = "";

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
        this.name = this.filter.Name
        this.isLoaded = true;
    }

    ngOnChanges() {
        this.name = this.filter.Name
        this.isLoaded = true;
    }

    close() {
        this.emitOutput()
    }

    emitOutput() {
        console.log("emited: finished")
        this.finishedOutput.emit(true);
    }

    async save() {
        this.isLoaded = false;
        let filterCopy = this.filter;
        filterCopy.Name = this.name
        filterCopy.IsDirty = true
        await this.shared.sendFilter(filterCopy)
        this.isLoaded = true
        this.emitOutput()
    }

    async saveAs() {
        this.isLoaded = false;
        let filterCopy = this.filter;
        filterCopy.Id = null;
        filterCopy.Name = this.name
        filterCopy.IsDirty = true
        await this.shared.sendFilter(filterCopy)
        this.isLoaded = true
        this.emitOutput()
    }
}
