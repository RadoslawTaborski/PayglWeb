import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Dashboard } from '../../entities/entities';
import { DashboardOutput } from '../../entities/DashboardOutput';
import { IDashboardOutput } from '../../entities/IDashboardOutput';
import { Countable } from '../../entities/Countable';
import { OperationLike } from '../../entities/OperationLike';
import { Operation } from '../../entities/Operation';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: Dashboard[] = []
    public output: IDashboardOutput = null;

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getDashboards(): Dashboard[] {
        return this.shared.dashboards
    }

    async onDashboardClick(o: Dashboard) {
        if (!this.clicked.includes(o)) {
            this.clicked = []
            this.clicked.push(o)
            await this.shared.loadDashboardOutput(o.Id)
            this.output = this.shared.dashboardOutput
        } else {
            this.clicked=[]
        }
    }
}
