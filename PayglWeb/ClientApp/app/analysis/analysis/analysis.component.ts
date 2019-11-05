import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Dashboard } from '../../entities/entities';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: Dashboard[] = []

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getDashboards(): Dashboard[] {
        return this.shared.dashboards
    }

    onDashboardClick(o: Dashboard) {
        if (!this.clicked.includes(o)) {
            this.clicked = []
            this.clicked.push(o)
        } else {
            this.clicked=[]
        }
    }

    isClicked(d: Dashboard): boolean {
        return this.clicked.includes(d);
    }
}
