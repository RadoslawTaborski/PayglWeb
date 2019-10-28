import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { OperationsGroup } from '../../entities/OperationsGroup';
import { Operation } from '../../entities/Operation';
import { OperationLike } from '../../entities/OperationLike';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: OperationLike[] = []
    public query: string = ""

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        await this.shared.loadOperations(true, this.query, null, null)
        await this.shared.loadOperationsGroups(this.query, null, null)       
        this.isLoaded = true;
        //console.log(this.isLoaded)
    }

    getOperationsGroups(): OperationsGroup[] {
        //console.log(this.shared.operationsGroups)
        return this.shared.operationsGroups.reverse()
    }

    getOperations(): Operation[] {
        //console.log(this.shared.operationsGroups)
        return this.shared.operations.reverse()
    }

    getOperationsLike(): OperationLike[] {
        let result: OperationLike[] = [];
        result = result.concat(this.getOperationsGroups());
        result = result.concat(this.getOperations());

        result = result.sort((n1, n2) => {
            var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

            let date1: number = new Date(n1.Date.replace(pattern, '$3-$2-$1')).getTime()
            let date2: number = new Date(n2.Date.replace(pattern, '$3-$2-$1')).getTime()
            let tmp: number = date2 - date1;
            return tmp
        })

        return result;
    }

    onOperationClick(o: OperationLike, isNested: boolean) {
        console.log(isNested)
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
        await this.shared.loadOperations(true, this.query, null, null)
        await this.shared.loadOperationsGroups(this.query, null, null)
    }
}
