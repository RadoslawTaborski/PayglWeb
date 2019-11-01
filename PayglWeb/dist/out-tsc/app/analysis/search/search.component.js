import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Operation } from '../../entities/Operation';
let SearchComponent = class SearchComponent {
    constructor(shared, state) {
        this.shared = shared;
        this.state = state;
        this.isLoaded = false;
        this.clicked = [];
        this.query = "";
        this.sum = 0;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.shared.loadAttributes();
            this.sum = 0;
            yield this.shared.loadOperations(true, "", null, null);
            yield this.shared.loadOperationsGroups(this.query, null, null);
            this.isLoaded = true;
            //console.log(this.isLoaded)
        });
    }
    getOperationsGroups() {
        //console.log(this.shared.operationsGroups)
        return this.shared.operationsGroups;
    }
    getOperations() {
        //console.log(this.shared.operationsGroups)
        return this.shared.operations;
    }
    getOperationsLike() {
        let result = [];
        result = result.concat(this.getOperationsGroups());
        result = result.concat(this.getOperations());
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
        console.log(isNested);
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
            yield this.shared.loadOperations(true, this.query, this.dateFrom, this.dateTo);
            yield this.shared.loadOperationsGroups(this.query, this.dateFrom, this.dateTo);
            this.isLoaded = true;
        });
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