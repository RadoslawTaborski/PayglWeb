import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let DashboardOutputComponent = class DashboardOutputComponent {
    constructor() {
        this.clicked = [];
    }
    ngOnInit() {
    }
    getDashboardOutputItems() {
        if (this.dashboard != null) {
            return this.dashboard.Children;
        }
    }
    isExpense(o) {
        return o.TransactionType.Text == 'wydatek';
    }
    onGroupClick(o, isNested) {
        console.log("click in template", isNested);
        if (isNested) {
            console.log("onGroupClick: " + o.Name + " " + this.clicked.includes(o));
            if (!this.clicked.includes(o)) {
                this.clicked.push(o);
                console.log("onGroupClick: " + o.Name + " " + this.clicked.includes(o));
            }
            else {
                const index = this.clicked.indexOf(o);
                if (index !== -1) {
                    this.clicked.splice(index, 1);
                }
            }
        }
        else {
            if (!this.clicked.includes(o)) {
                this.clicked = [];
                this.clicked.push(o);
            }
            else {
                this.clicked = [];
            }
        }
    }
    isClicked(o) {
        console.log("isClicked: " + o.Name + " " + this.clicked.includes(o));
        return this.clicked.includes(o);
    }
};
tslib_1.__decorate([
    Input()
], DashboardOutputComponent.prototype, "dashboard", void 0);
DashboardOutputComponent = tslib_1.__decorate([
    Component({
        selector: 'temp-dashboard',
        templateUrl: './dashboard-output.component.html',
        styleUrls: ['../templates.css']
    })
], DashboardOutputComponent);
export { DashboardOutputComponent };
//# sourceMappingURL=dashboard-output.component.js.map