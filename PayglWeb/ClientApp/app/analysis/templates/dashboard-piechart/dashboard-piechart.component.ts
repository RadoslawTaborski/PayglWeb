import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { IDashboardOutput } from '../../../entities/IDashboardOutput';
import { DashboardOutputLeaf } from '../../../entities/DashboardOutputLeaf';
import { DashboardOutput } from '../../../entities/DashboardOutput';

@Component({
    selector: 'app-dashboard-piechart',
    templateUrl: './dashboard-piechart.component.html',
    styleUrls: ['./dashboard-piechart.component.css']
})
export class DashboardPiechartComponent implements OnInit {
    @Input() dashboard: IDashboardOutput;
    public isLoaded: boolean = false
    public PieChart: Chart

    colours: string[] = ['rgba(99, 66, 255, 0.6)',
        'rgba(33, 00, 66, 0.6)',
        'rgba(66, 00, 255, 0.6)',
        'rgba(66, 33, 255, 0.6)',
        'rgba(204, 204, 255, 0.6)',
        'rgba(99, 99, 255, 0.6)',
        'rgba(99, 99, 204, 0.6)',
        'rgba(66, 66, 204, 0.6)',
        'rgba(66, 66, 255, 0.6)',
        'rgba(66, 66, 99, 0.6)',
        'rgba(33, 33, 66, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 99, 132, 0.6)']

    constructor() { }

    ngOnInit() {
        this.PieChart = this.generateChart(this.dashboard)
        this.isLoaded = true;
    }

    getDashboardLeaves(dashboard: IDashboardOutput): IDashboardOutput[] {
        let result: IDashboardOutput[] = []
        if (!(dashboard instanceof DashboardOutput)) {
            return result;
        }
        for (let leaf of (dashboard as DashboardOutput).Children) {
            result.push(leaf)
        }

        return result;
    }

    generateChart(dashboard: IDashboardOutput): Chart {
        let dashboardLeaves: IDashboardOutput[] = this.getDashboardLeaves(dashboard);
        let labels = dashboardLeaves.map(a => a.Name);
        let data = dashboardLeaves.map(a => a.Amount)

        let result = new Chart('pieChart', {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: this.colours,
                    borderWidth: 1
                }]
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
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.labels[tooltipItem.index].toString() || '';
                            if (label) {
                                label += ': ';
                            }
                            label += "" + (Math.round((data.datasets[0].data[tooltipItem.index] as number) * 100) / 100).toFixed(2);
                            return label;
                        }
                    }
                }
            },
        });

        return result;
    }
}
