import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { IFilter, Filter, Dashboard } from '../../entities/entities';

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

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getFilters(): Filter[] {
        //console.log(this.shared.filters)
        return this.shared.filters
    }

    getDashboards(): Dashboard[] {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards.filter(d => ! d.IsVisible)
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
        //console.log(this.filter)
        this.isLoaded = true
        this.emitOutput()
    }

    onItemChange(filter: IFilter) {
        this.filter = filter
    }
}
