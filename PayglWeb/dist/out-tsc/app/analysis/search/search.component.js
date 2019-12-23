import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Operation } from '../../entities/Operation';
import { DashboardOutputLeaf } from '../../entities/DashboardOutputLeaf';
import { Filter } from '../../entities/entities';
let SearchComponent = class SearchComponent {
    constructor(shared, state, activatedRoute) {
        this.shared = shared;
        this.state = state;
        this.activatedRoute = activatedRoute;
        this.isLoaded = false;
        this.clicked = [];
        this.query = "";
        this.sum = 0;
        this.saveMode = false;
        this.getRouteParams();
    }
    getRouteParams() {
        this.activatedRoute.queryParams.subscribe(params => {
            let number = Number(params.number);
            let user = this.shared.tmpCreatingUser();
            let name = params.name;
            let query = params.query;
            this.filter = new Filter(number, user, name, query);
        });
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.isLoaded = false;
            yield this.shared.loadAttributes();
            this.sum = 0;
            this.query = this.filter.Query;
            yield this.shared.loadDashboardOutput(this.query, null, null);
            let allDates = this.getAllDates(this.shared.dashboardOutput).sort();
            if (allDates.length != 0) {
                this.dateFrom = allDates[0].substring(0, 10);
                this.dateTo = allDates[allDates.length - 1].substring(0, 10);
            }
            this.isLoaded = true;
        });
    }
    getOperationsLike() {
        let result = [];
        if (!(this.shared.dashboardOutput instanceof DashboardOutputLeaf)) {
            return result;
        }
        result = this.shared.dashboardOutput.Result;
        result = result.sort((n1, n2) => {
            var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
            let date1 = new Date(n1.Date.replace(pattern, '$3-$2-$1')).getTime();
            let date2 = new Date(n2.Date.replace(pattern, '$3-$2-$1')).getTime();
            let tmp = date2 - date1;
            return tmp;
        });
        this.sum = 0;
        for (let op of result) {
            if (op.TransactionType.Text == "wydatek") {
                this.sum -= op.Amount;
            }
            else {
                this.sum += op.Amount;
            }
        }
        return result;
    }
    onOperationClick(o, isNested) {
        console.log("click in search");
        if (isNested) {
            console.log(!this.clicked.includes(o));
            if (!this.clicked.includes(o)) {
                this.clicked.push(o);
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
    isOperation(o) {
        return (o instanceof Operation);
    }
    isClicked(o) {
        return this.clicked.includes(o);
    }
    isExpense(o) {
        return o.TransactionType.Text == 'wydatek';
    }
    search() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.sum = 0;
            this.isLoaded = false;
            yield this.shared.loadDashboardOutput(this.query, this.dateFrom, this.dateTo);
            this.isLoaded = true;
        });
    }
    save(query) {
        this.filter.Query = this.query;
        this.saveMode = true;
    }
    getAllDates(dashboard) {
        let result = [];
        if (dashboard instanceof DashboardOutputLeaf) {
            for (let leaf of dashboard.Result) {
                result.push(leaf.Date);
            }
        }
        else {
            for (let child of dashboard.Children) {
                result = result.concat(this.getAllDates(child));
            }
        }
        return result;
    }
    getResponseFromSave($event) {
        this.saveMode = false;
    }
};
SearchComponent = tslib_1.__decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map