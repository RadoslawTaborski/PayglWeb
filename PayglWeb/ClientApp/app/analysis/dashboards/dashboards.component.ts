﻿import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Dashboard, IFilter, Filter } from '../../entities/entities';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: IFilter[] = [];

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getDashboards(): Dashboard[] {
        //console.log(this.shared.dashboards)
        return this.shared.dashboards
    }

    onDashboardClick(o: IFilter) {
        if (!this.clicked.includes(o)) {
            this.clicked.push(o);
        } else {
            const index = this.clicked.indexOf(o, 0);
            if (index > -1) {
                this.clicked.splice(index, 1);
            }
        }
    }

    isClicked(o: IFilter): boolean {
        return this.clicked.includes(o);
    }

    isFilter(f: IFilter): boolean {
        return (f instanceof Filter)
    }
}