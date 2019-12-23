import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Dashboard, IFilter, Filter, DashboardFilterRelation } from '../../entities/entities';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: IFilter[] = [];
    public selected: IFilter;
    showFilterAddMode: boolean;
    showDashboardAddMode: boolean;

    allDashboards: Dashboard[] = []

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.allDashboards = this.shared.dashboards
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    onDashboardClick(o: IFilter) {
        //console.log("click")
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

    drop(event: CdkDragDrop<string[]>, array: IFilter[]) {
        //console.log("here")
        moveItemInArray(array, event.previousIndex, event.currentIndex);
    }

    addFilter(o: IFilter) {
        //console.log("addFilter")
        this.selected = o
        this.showFilterAddMode = true;
    }

    getResponseFromAddFilter($event) {
        //console.log($event)
        this.showFilterAddMode = false;
        (this.selected as Dashboard).Relations.push(new DashboardFilterRelation(null, $event, true, 0))
    }

    addDashboard() {
        this.showDashboardAddMode = true;
    }

    getResponseFromNewDashboard($event) {
        this.showDashboardAddMode = false;
        this.allDashboards.push(new Dashboard(null, this.shared.tmpCreatingUser(), $event, false, []))
    }

    delete(d: Dashboard, o: IFilter) {
        if (o == null) {
            let index = this.allDashboards.indexOf(d, 0);
            if (index > -1) {
                this.allDashboards.splice(index, 1);
            }
        } else {
            let rel = d.Relations.filter(f => f.Filter == o)[0]
            let index = d.Relations.indexOf(rel, 0);
            if (index > -1) {
                d.Relations.splice(index, 1);
            }
        }
        //console.log("delete")
    }

    save() {
        console.log("save")
    }
}
