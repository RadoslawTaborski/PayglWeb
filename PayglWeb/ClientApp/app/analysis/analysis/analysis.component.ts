import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { Dashboard } from '../../entities/entities';
import { DashboardOutput } from '../../entities/DashboardOutput';
import { IDashboardOutput } from '../../entities/IDashboardOutput';
import { Countable } from '../../entities/Countable';
import { OperationLike } from '../../entities/OperationLike';
import { Operation } from '../../entities/Operation';
import { DashboardOutputLeaf } from '../../entities/DashboardOutputLeaf';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
    public isLoaded: boolean = false
    public dateFrom: Date
    public dateTo: Date
    public clicked: Dashboard[] = []
    public selectedDashboard: Dashboard = null;
    public output: IDashboardOutput = null;

    constructor(private shared: SharedService, private state: ApplicationStateService) {
        eval("window.myService=this;")
    }

    async ngOnInit() {
        await this.shared.loadFiltersAndDashboards()
        this.onDashboardClick(this.getDashboards()[0])
        this.isLoaded = true;
    }

    getDashboards(): Dashboard[] {
        return this.shared.dashboards.filter(d => d.IsVisible)
    }

    async onDashboardClick(o: Dashboard) {
        this.selectedDashboard = o;
        if (!this.clicked.includes(o)) {
            this.clicked = []
            this.clicked.push(o)
            await this.shared.loadDashboardOutput(o.Id, this.dateFrom, this.dateTo)
            this.output = this.shared.dashboardOutput        
        } else {
            this.clicked=[]
        }
    }

    async checkA() {
        if (this.output != null && this.output instanceof DashboardOutput) {
            (this.output as DashboardOutput).printDuplicates();
        } 
    }

    async checkB() {
        if (this.output != null && this.output instanceof DashboardOutput) {
            await this.shared.loadDashboardOutput("", this.dateFrom, this.dateTo);
            (this.output as DashboardOutput).printNotAssigned((this.shared.dashboardOutput as DashboardOutputLeaf).Result);
        }
    }

    async search() {
        this.isLoaded = false;
        if (this.selectedDashboard != null) {
            await this.shared.loadDashboardOutput(this.selectedDashboard.Id, this.dateFrom, this.dateTo)
            this.output = this.shared.dashboardOutput
        }
        this.isLoaded = true
    }
}
