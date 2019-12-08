import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardOutput } from '../../../entities/DashboardOutput';
let DashboardPiechartComponent = class DashboardPiechartComponent {
    constructor() {
        this.isLoaded = false;
        this.colours = ['rgba(99, 66, 255, 0.6)',
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
            'rgba(255, 99, 132, 0.6)'];
    }
    ngOnInit() {
        this.PieChart = this.generateChart(this.dashboard);
        this.isLoaded = true;
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
    generateChart(dashboard) {
        let dashboardLeaves = this.getDashboardLeaves(dashboard);
        let labels = dashboardLeaves.map(a => a.Name);
        let data = dashboardLeaves.map(a => a.Amount);
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
                            var label = data.labels[tooltipItem.index] || '';
                            if (label) {
                                label += ': ';
                            }
                            label += "" + (Math.round(data.datasets[0].data[tooltipItem.index] * 100) / 100).toFixed(2);
                            return label;
                        }
                    }
                }
            },
        });
        return result;
    }
};
tslib_1.__decorate([
    Input()
], DashboardPiechartComponent.prototype, "dashboard", void 0);
DashboardPiechartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-dashboard-piechart',
        templateUrl: './dashboard-piechart.component.html',
        styleUrls: ['./dashboard-piechart.component.css']
    })
], DashboardPiechartComponent);
export { DashboardPiechartComponent };
//# sourceMappingURL=dashboard-piechart.component.js.map