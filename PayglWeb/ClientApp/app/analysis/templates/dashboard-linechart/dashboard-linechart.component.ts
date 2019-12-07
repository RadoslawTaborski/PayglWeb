import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { IDashboardOutput } from '../../../entities/IDashboardOutput';
import { DashboardOutput } from '../../../entities/DashboardOutput';
import { DashboardOutputLeaf } from '../../../entities/DashboardOutputLeaf';

@Component({
    selector: 'app-dashboard-linechart',
    templateUrl: './dashboard-linechart.component.html',
    styleUrls: ['./dashboard-linechart.component.css']
})
export class DashboardLinechartComponent implements OnInit {
    @Input() dashboard: IDashboardOutput;
    @Input() dateFrom: Date
    @Input() dateTo: Date
    public isLoaded: boolean = false
    public LineChart: Chart

    constructor() { }

    ngOnInit() {
        this.LineChart = this.generateChart(this.dashboard, this.dateFrom, this.dateTo)
        this.isLoaded = true;
    }

    generateChart(dashboard: IDashboardOutput, dateFrom: Date, dateTo:Date): Chart {
        let lineChartData: LineChartData = LineChartData.createFromDashboard(dashboard, dateFrom, dateTo)

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
                            label += "" + (Math.round((data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as number) * 100) / 100).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        });

        return result;
    }
}

class AmountWithDate {
    date: string
    amount: number
    isExpense: boolean

    constructor(date: string, amount: number, isExpense: boolean) {
        this.date = date
        this.amount = amount
        this.isExpense = isExpense
    }
}

class AmountsWithDatesByMonth {
    month: string
    amounts: AmountWithDate[]

    constructor(month: string, amounts: AmountWithDate[]) {
        this.month = month
        this.amounts = amounts
    }

    sum(): number {
        let sumIncome: number = this.amounts.filter(a => !a.isExpense).reduce((sum, current) => sum + current.amount, 0);
        let sumExpense: number = this.amounts.filter(a => a.isExpense).reduce((sum, current) => sum + current.amount, 0);
        return Math.abs(sumIncome - sumExpense)
    }
}

class SplitedDashboard {
    items: AmountsWithDatesByMonth[]

    static createFromDashboard(dashboard: IDashboardOutput): SplitedDashboard {
        let result: SplitedDashboard = new SplitedDashboard()

        result.splitDashboardByMonths(dashboard)

        return result
    }

    private getAmountsWithDates(dashboard: IDashboardOutput): AmountWithDate[] {
        let result: AmountWithDate[] = []

        if (dashboard instanceof DashboardOutputLeaf) {
            for (let leaf of (dashboard as DashboardOutputLeaf).Result) {
                result.push(new AmountWithDate(leaf.Date, leaf.Amount, leaf.TransactionType.Id == 2))
            }
        } else {
            for (let child of (dashboard as DashboardOutput).Children) {
                result = result.concat(this.getAmountsWithDates(child))
            }
        }

        return result;
    }

    private splitDashboardByMonths(dashboard: IDashboardOutput) {
        let operations: AmountWithDate[] = this.getAmountsWithDates(dashboard);

        let dateMap = operations
            .reduce(
                (m, v) => {
                    let day = v.date.substring(0, 7)
                    let entry = m[day]
                    if (typeof entry === 'undefined') {
                        m[day] = [v]
                    } else {
                        entry.push(v)
                    }
                    return m
                },
                {}
            )

        this.items = Object.keys(dateMap).map(d => {
            return new AmountsWithDatesByMonth(d, dateMap[d])
        })
    }

    getAmounts(labels: string[]): number[] {
        let result: number[] = []
        for (let label of labels) {
            let item = this.items.find(i => i.month == label)
            if (item !== undefined) {
                result.push(item.sum())
            } else {
                result.push(0)
            }
        }
        return result
    }
}

class LineChartData {
    labels: string[]
    datasets: Chart.ChartDataSets[] = []
    colours: string[] = ['rgba(	255	,	0	,	0	,	1	)',
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
        'rgba(	128	,	128	,	128	,	1	)']

    static createFromDashboard(dashboard: IDashboardOutput, dateFrom: Date, dateTo: Date): LineChartData {
        let result: LineChartData = new LineChartData()

        result.generateFromDashboard(dashboard, dateFrom, dateTo)

        return result
    }

    private calculateLabels(dateFrom: Date, dateTo: Date): string[] {
        let result: string[] = []
        if (dateFrom != undefined && dateTo != undefined) {
            dateFrom = new Date(dateFrom)
            dateTo = new Date(dateTo)
            let targetDate: Date = new Date(dateFrom)
            targetDate.setDate(1)
            while (targetDate <= dateTo) {
                result.push(targetDate.toISOString().substring(0,7))
                targetDate.setMonth(targetDate.getMonth()+1)
            }
        }
        return result;
    }

    private generateFromDashboard(dashboard: IDashboardOutput, dateFrom: Date, dateTo: Date) {
        this.labels = this.calculateLabels(dateFrom, dateTo)
        let dashboardLeaves: IDashboardOutput[] = this.getDashboardLeaves(dashboard);
        let index: number = 0
        for (let leaf of dashboardLeaves) {
            let splitedDashboard = SplitedDashboard.createFromDashboard(leaf);
            this.datasets.push({
                label: leaf.Name,
                data: splitedDashboard.getAmounts(this.labels),
                fill: false,
                lineTension: 0.2,
                borderColor: this.colours[index % this.colours.length],
                borderWidth: 2
            })
            ++index
        }
    }

    private getDashboardLeaves(dashboard: IDashboardOutput): IDashboardOutput[] {
        let result: IDashboardOutput[] = []
        if (!(dashboard instanceof DashboardOutput)) {
            return result;
        }
        for (let leaf of (dashboard as DashboardOutput).Children) {
            result.push(leaf)
        }

        return result;
    }
}