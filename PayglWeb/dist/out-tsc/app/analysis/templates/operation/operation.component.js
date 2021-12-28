import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Operation } from '../../../entities/Operation';
let OperationComponent = class OperationComponent {
    constructor(state) {
        this.state = state;
        this.clicked = [];
    }
    ngOnInit() {
        //console.log(this.operation)
    }
    onOperationClick(o, isNested) {
        if (isNested) {
            //console.log(!this.clicked.includes(o))
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
        //console.log(o)
        return o.TransactionType.Text == 'wydatek';
    }
    edit(o) {
        this.editedOperation = o;
        //console.log(o.Description)
    }
    getResponseFromGroup(event) {
        this.editedOperation = undefined;
    }
};
__decorate([
    Input()
], OperationComponent.prototype, "operation", void 0);
OperationComponent = __decorate([
    Component({
        selector: 'temp-operation',
        templateUrl: './operation.component.html',
        styleUrls: ['../templates.css']
    })
], OperationComponent);
export { OperationComponent };
//# sourceMappingURL=operation.component.js.map