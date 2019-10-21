import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"

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

    loadOperationsGroups(from?: Date, to?: Date): Promise<any[]> {
        if (from != null && to != null) {
            var fromFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            var toFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            return this.http.get<any[]>(`api/operationsGroups/${fromFormated}/${toFormated}`).toPromise()
        } else {
            return this.http.get<any[]>("api/operationsGroups").toPromise()
        }
    }

    loadOperations(withoutParent?: boolean, from?: Date, to?: Date): Promise<any[]> {
        if (from != null && to != null && withoutParent != null) {
            var fromFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            var toFormated = from.toISOString().slice(0, 10).replace(/-/g, "");
            return this.http.get<any[]>(`api/operations/${fromFormated}/${toFormated}/${withoutParent}`).toPromise()
        } else if (withoutParent != null) {
            return this.http.get<any[]>(`api/operations/${withoutParent}`).toPromise()
        } else {
            return this.http.get<any[]>(`api/operations`).toPromise()
        }
    }
}