import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { ApplicationStateService } from '../../shared/application-state.service';
import { OperationsGroup } from '../../entities/OperationsGroup';
import { Operation } from '../../entities/Operation';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public isLoaded: boolean = false
    public clicked: Operation[] = []

    constructor(private shared: SharedService, private state: ApplicationStateService) { }

    async ngOnInit() {
        await this.shared.loadAttributes()
        await this.shared.loadOperations()
        await this.shared.loadOperationsGroups()       
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

    onOperationClick(o: Operation) {   
        if (!this.clicked.includes(o)) {
            this.clicked = []
            this.clicked.push(o);
        } else {
            this.clicked = []
        }
    }

    isClicked(o: Operation) {
        return this.clicked.includes(o);
    }

    isExpense(o: Operation) {
        return o.TransactionType.Text=='wydatek'
    }
}
