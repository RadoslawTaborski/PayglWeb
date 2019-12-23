import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { OperationsGroup } from '../../entities/OperationsGroup';
import { Operation } from '../../entities/Operation';
import { OperationLike } from '../../entities/OperationLike';
import { DashboardOutput } from '../../entities/DashboardOutput';
import { DashboardOutputLeaf } from '../../entities/DashboardOutputLeaf';
import { IDashboardOutput } from '../../entities/IDashboardOutput';
import { Filter, User, Details, Language } from '../../entities/entities';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: OperationLike[] = []
    public dashboard: DashboardOutput
    public query: string = ""
    public dateFrom: string
    public dateTo: string
    public sum: number = 0
    public filter: Filter;
    public saveMode: boolean = false;

    constructor(private shared: SharedService, private state: ApplicationStateService, private activatedRoute: ActivatedRoute
    ) {
        this.getRouteParams();
    }

    getRouteParams() {
        this.activatedRoute.queryParams.subscribe(params => {
            let number = Number(params.number)
            let user = this.shared.tmpCreatingUser();
            let name = params.name;
            let query = params.query;

            this.filter = new Filter(number, user, name, query)
        });
    }

    async ngOnInit() {
        this.isLoaded = false;
        await this.shared.loadAttributes()
        this.sum = 0
        this.query = this.filter.Query;
        await this.shared.loadDashboardOutput(this.query, null, null)
        let allDates = this.getAllDates(this.shared.dashboardOutput).sort()
        if (allDates.length != 0) {
            this.dateFrom = allDates[0].substring(0, 10)
            this.dateTo = allDates[allDates.length - 1].substring(0, 10)
        }
        this.isLoaded = true;
    }

    getOperationsLike(): OperationLike[] {
        let result: OperationLike[] = []
        if (! (this.shared.dashboardOutput instanceof DashboardOutputLeaf)) {
            return result
        }
        result = (this.shared.dashboardOutput as DashboardOutputLeaf).Result

        result = result.sort((n1, n2) => {
            var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

            let date1: number = new Date(n1.Date.replace(pattern, '$3-$2-$1')).getTime()
            let date2: number = new Date(n2.Date.replace(pattern, '$3-$2-$1')).getTime()
            let tmp: number = date2 - date1;
            return tmp
        })

        this.sum=0
        for (let op of result) {
            if (op.TransactionType.Text == "wydatek") {
                this.sum -= op.Amount
            } else {
                this.sum += op.Amount
            }
        }

        return result;
    }

    onOperationClick(o: OperationLike, isNested: boolean) {
        console.log("click in search")
        if (isNested) {
            console.log(!this.clicked.includes(o))
            if (!this.clicked.includes(o)) {
                this.clicked.push(o);
            } else {
                const index: number = this.clicked.indexOf(o);
                if (index !== -1) {
                    this.clicked.splice(index, 1);
                }  
            }
        } else {
            if (!this.clicked.includes(o)) {
                this.clicked = []
                this.clicked.push(o);
            } else {
                this.clicked = []
            }
        }
    }

    isOperation(o: OperationLike): boolean {
        return (o instanceof Operation)
    }   

    isClicked(o: OperationLike): boolean {
        return this.clicked.includes(o);
    }

    isExpense(o: OperationLike): boolean {
        return o.TransactionType.Text=='wydatek'
    }

    async search() {
        this.sum=0
        this.isLoaded = false;
        await this.shared.loadDashboardOutput(this.query, this.dateFrom, this.dateTo) 
        this.isLoaded=true
    }

    save(query: string) {
        this.filter.Query = this.query
        this.saveMode = true;
    }

    getAllDates(dashboard: IDashboardOutput): string[] {
        let result: string[] = []

        if (dashboard instanceof DashboardOutputLeaf) {
            for (let leaf of (dashboard as DashboardOutputLeaf).Result) {
                result.push(leaf.Date)
            }
        } else {
            for (let child of (dashboard as DashboardOutput).Children) {
                result = result.concat(this.getAllDates(child))
            }
        }

        return result;
    }

    getResponseFromSave($event) {
        this.saveMode = false;
    }

}
