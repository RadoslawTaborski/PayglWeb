import * as tslib_1 from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
};
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.frequencies = [];
        this.importances = [];
        this.tags = [];
        this.transactionTypes = [];
        this.transferTypes = [];
        this.operations = [];
        this.operationsGroup = [];
    }
    loadFrequencies() {
        return this.http.get("api/frequencies").toPromise();
    }
    loadImportances() {
        return this.http.get("api/importances").toPromise();
    }
    loadTags() {
        return this.http.get("api/tags").toPromise();
    }
    loadTransactionTypes() {
        return this.http.get("api/transactionsTypes").toPromise();
    }
    loadTransferTypes() {
        return this.http.get("api/transferTypes").toPromise();
    }
    loadFilters() {
        return this.http.get("api/filters").toPromise();
    }
    loadDashboards() {
        return this.http.get("api/dashboards").toPromise();
    }
    loadOperationsGroups(from, to) {
        if (from != null && to != null && from.toString() != "" && to.toString() != "") {
            //var fromFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            //var toFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            return this.http.get(`api/operationsGroups/${from}/${to}`).toPromise();
        }
        else {
            return this.http.get("api/operationsGroups").toPromise();
        }
    }
    loadOperations(withoutParent, from, to) {
        if (from != null && to != null && from.toString() != "" && to.toString() != "" && withoutParent != null) {
            // var fromFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            //var toFormated = to.toISOString().slice(0, 10).replace(/-/g, "");
            return this.http.get(`api/operations/${from}/${to}/${withoutParent}`).toPromise();
        }
        else if (withoutParent != null) {
            return this.http.get(`api/operations/${withoutParent}`).toPromise();
        }
        else {
            return this.http.get(`api/operations`).toPromise();
        }
    }
    loadDashboardOutput(query, from, to) {
        if (typeof (query) == "string" && query == "") {
            query = "null";
        }
        if (from != null && to != null && from.toString() != "" && to.toString() != "") {
            return this.http.get(`api/dashboardsoutputs/${query}/${from}/${to}`).toPromise();
        }
        else {
            return this.http.get(`api/dashboardsoutputs/${query}`).toPromise();
        }
    }
    loadDashboardsOutputs(from, to) {
        if (from != null && to != null && from.toString() != "" && to.toString() != "") {
            return this.http.get(`api/dashboardsoutputs/${from}/${to}`).toPromise();
        }
        else {
            return this.http.get(`api/dashboardsoutputs/`).toPromise();
        }
    }
    sendOperation(operation) {
        let json = JSON.stringify(operation);
        //console.log(json);
        return this.http.post(`api/operations`, json, httpOptions).toPromise();
    }
    sendOperationsGroup(operationsGroup) {
        let json = JSON.stringify(operationsGroup);
        //console.log(json);
        return this.http.post(`api/operationsGroups`, json, httpOptions).toPromise();
    }
};
DataService = tslib_1.__decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map