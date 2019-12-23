import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { IFilter } from '../../entities/entities';

@Component({
  selector: 'app-filter-selection',
  templateUrl: './filter-selection.component.html',
  styleUrls: ['./filter-selection.component.css']
})
export class FilterSelectionComponent implements OnInit {
    @Input() visible: boolean
    @Output() finishedOutput = new EventEmitter<IFilter>();

    filter: IFilter

    isLoaded: boolean = false;
    name: string = "";

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    ngOnInit() {
        this.isLoaded = true;
    }

    ngOnChanges() {
        this.isLoaded = true;
    }

    close() {
        this.emitOutput()
    }

    emitOutput() {
        console.log("emited: finished")
        this.finishedOutput.emit(this.filter);
    }

    async select() {
        this.isLoaded = false;
        this.isLoaded = true
        this.emitOutput()
    }
}
