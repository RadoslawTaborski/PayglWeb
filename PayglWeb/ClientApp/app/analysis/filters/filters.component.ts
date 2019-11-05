import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Filter } from '../../entities/entities';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: Filter[] = [];

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

    onFilterClick(o: Filter) {
        if (!this.clicked.includes(o)) {
            this.clicked = []
            this.clicked.push(o);
        } else {
            this.clicked = []
        }
    }

    isClicked(o: Filter): boolean {
        return this.clicked.includes(o);
    }
}
