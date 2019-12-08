import { Component, OnInit, Input } from '@angular/core';
import { OperationLike } from '../../../entities/OperationLike';
import { Operation } from '../../../entities/Operation';
import { ApplicationStateService } from '../../../shared/application-state.service';

@Component({
  selector: 'temp-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['../templates.css']
})
export class OperationComponent implements OnInit {
    @Input() operation: OperationLike;
    public clicked: OperationLike[] = []
    editedOperation: OperationLike;

    constructor(private state: ApplicationStateService) {}

    ngOnInit(): void {
        //console.log(this.operation)
    }

    onOperationClick(o: OperationLike, isNested: boolean) {
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
        //console.log(o)
        return o.TransactionType.Text == 'wydatek'
    }

    edit(o: OperationLike) {
        this.editedOperation = o;
        console.log(o.Description)
    }
}
