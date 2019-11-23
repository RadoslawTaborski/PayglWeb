import { Component, OnInit, Input } from '@angular/core';
import { IDashboardOutput } from '../../../entities/IDashboardOutput';
import { DashboardOutput } from '../../../entities/DashboardOutput';

@Component({
    selector: 'temp-dashboard',
    templateUrl: './dashboard-output.component.html',
    styleUrls: ['../templates.css']
})
export class DashboardOutputComponent implements OnInit {
    @Input() dashboard: IDashboardOutput;
    public clicked: IDashboardOutput[] = []

    constructor() { }

    ngOnInit() {
    }

    getDashboardOutputItems(): IDashboardOutput[] {
        if (this.dashboard != null) {
            return (this.dashboard as DashboardOutput).Children
        }
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

    isClicked(o: IDashboardOutput): boolean {
        return this.clicked.includes(o);
    }
}
