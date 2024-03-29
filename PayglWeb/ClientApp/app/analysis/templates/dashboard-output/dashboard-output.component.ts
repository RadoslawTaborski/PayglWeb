import { Component, OnInit, Input } from '@angular/core';
import { IDashboardOutput } from '../../../entities/IDashboardOutput';
import { DashboardOutput } from '../../../entities/DashboardOutput';
import { ApplicationStateService } from '../../../shared/application-state.service';

@Component({
    selector: 'temp-dashboard',
    templateUrl: './dashboard-output.component.html',
    styleUrls: ['../templates.css']
})
export class DashboardOutputComponent implements OnInit {
    @Input() dashboard: IDashboardOutput;
    @Input() dateFrom: Date
    @Input() dateTo: Date
    public clicked: IDashboardOutput[] = []
    public selectedPie: IDashboardOutput[] = []
    public allDashboard: IDashboardOutput[] = []
    public canDisplayCharts: boolean = false;
    public chartsArePossible: boolean = false;

    constructor(public state: ApplicationStateService) { }

    ngOnInit() {

    }

    ngOnChanges() {
        this.allDashboard = this.getDashboards(this.dashboard)
        if (this.allDashboard.length >= 1) {
            this.setDashboardForPieChart(this.allDashboard[0])
        }
    }

    getDashboardOutputItems(): IDashboardOutput[] {
        if (this.dashboard != null) {
            let result = (this.dashboard as DashboardOutput).Children
            if (result != null && result.length > 0) {
                this.chartsArePossible = true;
            } else {
                this.chartsArePossible = false;
            }
            return result
        }
        this.chartsArePossible = false;
    }

    isExpense(o: IDashboardOutput): boolean {
        return o.TransactionType.Text == 'wydatek'
    }

    onGroupClick(o: IDashboardOutput, isNested: boolean) {
        if (isNested) {
            if (!this.clicked.includes(o)) {
                this.clicked.push(o);
            } else {
                const index: number = this.clicked.indexOf(o);
                if (index !== -1) {
                    this.clicked.splice(index, 1);
                }
            }
        } else {
            if (!this.clicked.includes(o)) {
                this.clicked = []
                this.clicked.push(o);
            } else {
                this.clicked = []
            }
        }
    }

    getDashboards(dashboard: IDashboardOutput): IDashboardOutput[] {
        let result: IDashboardOutput[] = []
        if (!(dashboard instanceof DashboardOutput)) {
            return result;
        }
        result.push(dashboard)
        for (let leaf of (dashboard as DashboardOutput).Children) {
            if (!(leaf instanceof DashboardOutput)) {
                continue;
            }
            result.push(leaf)
            for (let leaf2 of (leaf as DashboardOutput).Children) {
                if (leaf2 instanceof DashboardOutput) {
                    result.push(leaf2)
                }
            }
        }

        return result;
    }

    setDashboardForPieChart(dash: IDashboardOutput) {
        if (!this.selectedPie.includes(dash)) {
            this.selectedPie = []
            this.selectedPie.push(dash);
        }
    }

    isSelected(o: IDashboardOutput): boolean {
        return this.selectedPie.includes(o);
    }

    isClicked(o: IDashboardOutput): boolean {
        return this.clicked.includes(o);
    }

    displayCharts() {
        this.canDisplayCharts = !this.canDisplayCharts;
    }
}
