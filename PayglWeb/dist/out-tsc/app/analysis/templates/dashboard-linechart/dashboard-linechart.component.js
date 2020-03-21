import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardOutput } from '../../../entities/DashboardOutput';
import { DashboardOutputLeaf } from '../../../entities/DashboardOutputLeaf';
let DashboardLinechartComponent = class DashboardLinechartComponent {
    constructor() {
        this.isLoaded = false;
    }
    ngOnInit() {
        this.LineChart = this.generateChart(this.dashboard, this.dateFrom, this.dateTo);
        this.isLoaded = true;
    }
    generateChart(dashboard, dateFrom, dateTo) {
        let lineChartData = LineChartData.createFromDashboard(dashboard, dateFrom, dateTo);
        let result = new Chart('lineChart', {
            type: 'line',
            data: {
                labels: lineChartData.labels,
                datasets: lineChartData.datasets,
            },
            options: {
                title: {
                    text: dashboard.Name,
                    display: true
                },
                legend: {
                    display: false,
                    position: 'left',
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += "" + (Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        });
        return result;
    }
};
__decorate([
    Input()
], DashboardLinechartComponent.prototype, "dashboard", void 0);
__decorate([
    Input()
], DashboardLinechartComponent.prototype, "dateFrom", void 0);
__decorate([
    Input()
], DashboardLinechartComponent.prototype, "dateTo", void 0);
DashboardLinechartComponent = __decorate([
    Component({
        selector: 'app-dashboard-linechart',
        templateUrl: './dashboard-linechart.component.html',
        styleUrls: ['./dashboard-linechart.component.css']
    })
], DashboardLinechartComponent);
export { DashboardLinechartComponent };
class AmountWithDate {
    constructor(date, amount, isExpense) {
        this.date = date;
        this.amount = amount;
        this.isExpense = isExpense;
    }
}
class AmountsWithDatesByMonth {
    constructor(month, amounts) {
        this.month = month;
        this.amounts = amounts;
    }
    sum() {
        let sumIncome = this.amounts.filter(a => !a.isExpense).reduce((sum, current) => sum + current.amount, 0);
        let sumExpense = this.amounts.filter(a => a.isExpense).reduce((sum, current) => sum + current.amount, 0);
        return Math.abs(sumIncome - sumExpense);
    }
}
class SplitedDashboard {
    static createFromDashboard(dashboard) {
        let result = new SplitedDashboard();
        result.splitDashboardByMonths(dashboard);
        return result;
    }
    getAmountsWithDates(dashboard) {
        let result = [];
        if (dashboard instanceof DashboardOutputLeaf) {
            for (let leaf of dashboard.Result) {
                result.push(new AmountWithDate(leaf.Date, leaf.Amount, leaf.TransactionType.Id == 2));
            }
        }
        else {
            for (let child of dashboard.Children) {
                result = result.concat(this.getAmountsWithDates(child));
            }
        }
        return result;
    }
    splitDashboardByMonths(dashboard) {
        let operations = this.getAmountsWithDates(dashboard);
        let dateMap = operations
            .reduce((m, v) => {
            let day = v.date.substring(0, 7);
            let entry = m[day];
            if (typeof entry === 'undefined') {
                m[day] = [v];
            }
            else {
                entry.push(v);
            }
            return m;
        }, {});
        this.items = Object.keys(dateMap).map(d => {
            return new AmountsWithDatesByMonth(d, dateMap[d]);
        });
    }
    getAmounts(labels) {
        let result = [];
        for (let label of labels) {
            let item = this.items.find(i => i.month == label);
            if (item !== undefined) {
                result.push(item.sum());
            }
            else {
                result.push(0);
            }
        }
        return result;
    }
}
class LineChartData {
    constructor() {
        this.datasets = [];
        this.colours = ['rgba(	255	,	0	,	0	,	1	)',
            'rgba(	255	,	128	,	0	,	1	)',
            'rgba(	255	,	255	,	0	,	1	)',
            'rgba(	128	,	255	,	0	,	1	)',
            'rgba(	0	,	255	,	0	,	1	)',
            'rgba(	0	,	255	,	128	,	1	)',
            'rgba(	0	,	255	,	255	,	1	)',
            'rgba(	0	,	128	,	255	,	1	)',
            'rgba(	0	,	0	,	255	,	1	)',
            'rgba(	127	,	0	,	255	,	1	)',
            'rgba(	255	,	0	,	255	,	1	)',
            'rgba(	255	,	0	,	127	,	1	)',
            'rgba(	128	,	128	,	128	,	1	)'];
    }
    static createFromDashboard(dashboard, dateFrom, dateTo) {
        let result = new LineChartData();
        result.generateFromDashboard(dashboard, dateFrom, dateTo);
        return result;
    }
    calculateLabels(dateFrom, dateTo) {
        let result = [];
        if (dateFrom != undefined && dateTo != undefined) {
            dateFrom = new Date(dateFrom);
            dateTo = new Date(dateTo);
            let targetDate = new Date(dateFrom);
            targetDate.setDate(1);
            while (targetDate <= dateTo) {
                result.push(targetDate.toISOString().substring(0, 7));
                targetDate.setMonth(targetDate.getMonth() + 1);
            }
        }
        return result;
    }
    generateFromDashboard(dashboard, dateFrom, dateTo) {
        this.labels = this.calculateLabels(dateFrom, dateTo);
        let dashboardLeaves = this.getDashboardLeaves(dashboard);
        let index = 0;
        for (let leaf of dashboardLeaves) {
            let splitedDashboard = SplitedDashboard.createFromDashboard(leaf);
            this.datasets.push({
                label: leaf.Name,
                data: splitedDashboard.getAmounts(this.labels),
                fill: false,
                lineTension: 0.2,
                borderColor: this.colours[index % this.colours.length],
                borderWidth: 2
            });
            ++index;
        }
    }
    getDashboardLeaves(dashboard) {
        let result = [];
        if (!(dashboard instanceof DashboardOutput)) {
            return result;
        }
        for (let leaf of dashboard.Children) {
            result.push(leaf);
        }
        return result;
    }
}
//# sourceMappingURL=dashboard-linechart.component.js.map