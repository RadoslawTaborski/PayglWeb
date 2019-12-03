import { DashboardOutputLeaf } from './DashboardOutputLeaf';
import { OperationsGroup } from './OperationsGroup';
export class DashboardOutput {
    constructor(name, children) {
        this.Amount = 0;
        this.Name = name;
        this.Children = children;
    }
    recalculate(transactionTypes) {
        this.Amount = 0;
        for (let dashboardOutput of this.Children) {
            if (dashboardOutput.TransactionType.Text == "wydatek") {
                this.Amount -= dashboardOutput.Amount;
            }
            else {
                this.Amount += dashboardOutput.Amount;
            }
        }
        if (this.Amount > 0) {
            this.TransactionType = transactionTypes.filter(t => t.Text == "przychód")[0];
        }
        else {
            this.TransactionType = transactionTypes.filter(t => t.Text == "wydatek")[0];
        }
        this.Amount = Math.abs(this.Amount);
    }
    static createFromJson(data, frequencies, importances, tags, transactionTypes, transferTypes) {
        let dashboardOutput = new DashboardOutput();
        //console.log(data)
        dashboardOutput.Name = data.Name;
        dashboardOutput.Children = [];
        for (let child of data.Children) {
            if (child.Children === undefined) {
                dashboardOutput.Children.push(DashboardOutputLeaf.createFromJson(child, frequencies, importances, tags, transactionTypes, transferTypes));
            }
            else {
                dashboardOutput.Children.push(DashboardOutput.createFromJson(child, frequencies, importances, tags, transactionTypes, transferTypes));
            }
        }
        dashboardOutput.recalculate(transactionTypes);
        return dashboardOutput;
    }
    printDuplicates() {
        console.log("DUPLICATES: ");
        let duplicates = this.findDuplicates();
        for (let tmp of duplicates) {
            console.log(tmp.operation.Id, tmp.dashboardName, tmp.operation.Description);
        }
    }
    printNotAssigned(allOperationsLike) {
        console.log("NOT ASSIGNED: ");
        let notAssigned = this.findNotAssigned(allOperationsLike);
        for (let tmp of notAssigned) {
            console.log(tmp.Id, tmp);
        }
    }
    findNotAssigned(allOperationsLike) {
        let result = [];
        let foundOperations = [];
        let allOperations = this.getOperationsFromOperationLikeArray(allOperationsLike);
        this.findAllOperations(foundOperations);
        for (let tmp of allOperations) {
            if (foundOperations.filter(t => t.operation.Id == tmp.Id).length == 0) {
                result.push(tmp);
            }
        }
        return result;
    }
    findDuplicates() {
        let result = [];
        let allOperations = [];
        this.findAllOperations(allOperations);
        for (let tmp of allOperations) {
            if (allOperations.filter(t => t.operation.Id == tmp.operation.Id).length > 1) {
                result.push(tmp);
            }
        }
        return result;
    }
    getOperationsFromOperationLikeArray(allOperationsLike) {
        let allOperations = [];
        for (let tmp of allOperationsLike) {
            if (tmp instanceof OperationsGroup) {
                for (let op of tmp.Operations) {
                    allOperations.push(op);
                }
            }
            else {
                allOperations.push(tmp);
            }
        }
        return allOperations;
    }
    findAllOperations(allOperations) {
        for (let child of this.Children) {
            if (child instanceof DashboardOutputLeaf) {
                for (let tmp of child.Result) {
                    if (tmp instanceof OperationsGroup) {
                        for (let op of tmp.Operations) {
                            allOperations.push(new OperationDashboardPair(op, child.Name));
                        }
                    }
                    else {
                        allOperations.push(new OperationDashboardPair(tmp, child.Name));
                    }
                }
            }
            else {
                child.findAllOperations(allOperations);
            }
        }
    }
}
class OperationDashboardPair {
    constructor(operation, dashboardName) {
        this.operation = operation;
        this.dashboardName = dashboardName;
    }
}
//# sourceMappingURL=DashboardOutput.js.map