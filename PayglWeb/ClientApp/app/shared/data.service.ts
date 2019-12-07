import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"
import { Operation } from '../entities/Operation';
import { OperationsGroup } from '../entities/OperationsGroup';

const httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
};

@Injectable()
export class DataService {
    public frequencies = []
    public importances = []
    public tags = []
    public transactionTypes = []
    public transferTypes = []
    public operations = []
    public operationsGroup = []

    constructor(private http: HttpClient) { }

    loadFrequencies(): Promise<any[]> {
        return this.http.get<any[]>("api/frequencies").toPromise()
    }

    loadImportances(): Promise<any[]> {
        return this.http.get<any[]>("api/importances").toPromise()
    }

    loadTags(): Promise<any[]> {
        return this.http.get<any[]>("api/tags").toPromise()
    }

    loadTransactionTypes(): Promise<any[]> {
        return this.http.get<any[]>("api/transactionsTypes").toPromise()
    }

    loadTransferTypes(): Promise<any[]> {
        return this.http.get<any[]>("api/transferTypes").toPromise()
    }

    loadFilters(): Promise<any[]> {
        return this.http.get<any[]>("api/filters").toPromise()
    }

    loadDashboards(): Promise<any[]> {
        return this.http.get<any[]>("api/dashboards").toPromise()
    }

    loadOperationsGroups(from?: string, to?: string): Promise<any[]> {
        if (from != null && to != null && from.toString() != "" && to.toString() != "") {
            //var fromFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            //var toFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            return this.http.get<any[]>(`api/operationsGroups/${from}/${to}`).toPromise()
        } else {
            return this.http.get<any[]>("api/operationsGroups").toPromise()
        }
    }

    loadOperations(withoutParent?: boolean, from?: string, to?: string): Promise<any[]> {
        if (from != null && to != null && from.toString() != "" && to.toString() != "" && withoutParent != null) {
           // var fromFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            //var toFormated = to.toISOString().slice(0, 10).replace(/-/g, "");
            return this.http.get<any[]>(`api/operations/${from}/${to}/${withoutParent}`).toPromise()
        } else if (withoutParent != null) {
            return this.http.get<any[]>(`api/operations/${withoutParent}`).toPromise()
        } else {
            return this.http.get<any[]>(`api/operations`).toPromise()
        }
    }

    loadDashboardOutput(query?: string | number, from?: string, to?: string): Promise<any[]> {
        if (typeof (query) == "string" && query == "") {
            query = "null"
        }

        if (from != null && to != null && from.toString() != "" && to.toString() != "") {
            return this.http.get<any[]>(`api/dashboardsoutputs/${query}/${from}/${to}`).toPromise()
        } else {
            return this.http.get<any[]>(`api/dashboardsoutputs/${query}`).toPromise()
        }
    }

    loadDashboardsOutputs(from?: string, to?: string): Promise<any[]> {
        if (from != null && to != null && from.toString() != "" && to.toString() != "") {
            return this.http.get<any[]>(`api/dashboardsoutputs/${from}/${to}`).toPromise()
        } else {
            return this.http.get<any[]>(`api/dashboardsoutputs/`).toPromise()
        }
    }

    sendOperation(operation: Operation): Promise<any[]> {
        let json = JSON.stringify(operation)
        //console.log(json);
        return this.http.post<any>(`api/operations`, json, httpOptions).toPromise();
    }

    sendOperationsGroup(operationsGroup: OperationsGroup): Promise<any[]> {
        let json = JSON.stringify(operationsGroup)
        //console.log(json);
        return this.http.post<any>(`api/operationsGroups`, json, httpOptions).toPromise();
    }
}