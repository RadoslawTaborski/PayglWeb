import { IDashboardOutput } from './IDashboardOutput';
import { Frequency, Importance, Tag, TransactionType, TransferType } from './entities';
import { DashboardOutputLeaf } from './DashboardOutputLeaf';
import { Operation } from './Operation';
import { OperationsGroup } from './OperationsGroup';
import { OperationLike } from './OperationLike';

export class DashboardOutput implements IDashboardOutput {
    Name: string
    Children: IDashboardOutput[]

    Amount: number = 0;
    TransactionType: TransactionType;

    constructor(name?: string, children?: IDashboardOutput[]) {
        this.Name = name
        this.Children = children
    }

    recalculate(transactionTypes: TransactionType[]) {
        this.Amount = 0;
        for (let dashboardOutput of this.Children) {
            if (dashboardOutput.TransactionType.Text == "wydatek") {
                this.Amount -= dashboardOutput.Amount;
            } else {
                this.Amount += dashboardOutput.Amount;
            }
        }
        if (this.Amount > 0) {
            this.TransactionType = transactionTypes.filter(t => t.Text == "przychód")[0];
        } else {
            this.TransactionType = transactionTypes.filter(t => t.Text == "wydatek")[0];
        }
        this.Amount = Math.abs(this.Amount);
    }

    static createFromJson(data: any, frequencies: Frequency[], importances: Importance[], tags: Tag[], transactionTypes: TransactionType[], transferTypes: TransferType[]): DashboardOutput {
        let dashboardOutput = new DashboardOutput()
        //console.log(data)
        dashboardOutput.Name = data.Name
        dashboardOutput.Children = []

        for (let child of data.Children) {
            if (child.Children === undefined) {
                dashboardOutput.Children.push(DashboardOutputLeaf.createFromJson(child, frequencies, importances, tags, transactionTypes, transferTypes))
            } else {
                dashboardOutput.Children.push(DashboardOutput.createFromJson(child, frequencies, importances, tags, transactionTypes, transferTypes))
            }
        }

        dashboardOutput.recalculate(transactionTypes);

        return dashboardOutput
    }

    printDuplicates() {
        console.log("DUPLICATES: ")
        let duplicates = this.findDuplicates()
        for (let tmp of duplicates) {
            console.log(tmp.operation.Id, tmp.dashboardName, tmp.operation.Description)
        }
    }

    printNotAssigned(allOperationsLike: OperationLike[]) {
        console.log("NOT ASSIGNED: ")
        let notAssigned = this.findNotAssigned(allOperationsLike)
        for (let tmp of notAssigned) {
            console.log(tmp.Id, tmp)
        }
    }

    findNotAssigned(allOperationsLike: OperationLike[]): Operation[] {
        let result: Operation[] = []

        let foundOperations: OperationDashboardPair[] = []
        let allOperations: Operation[] = this.getOperationsFromOperationLikeArray(allOperationsLike)
        this.findAllOperations(foundOperations)

        for (let tmp of allOperations) {
            if (foundOperations.filter(t => t.operation.Id == tmp.Id).length == 0) {
                result.push(tmp)
            }
        }

        return result;
    }

    findDuplicates(): OperationDashboardPair[] {
        let result: OperationDashboardPair[] = []
        let allOperations: OperationDashboardPair[] = []
        this.findAllOperations(allOperations)

        for (let tmp of allOperations) {
            if (allOperations.filter(t => t.operation.Id == tmp.operation.Id).length > 1) {
                result.push(tmp)
            }
        }

        return result;
    }

    private getOperationsFromOperationLikeArray(allOperationsLike: OperationLike[]): Operation[] {
        let allOperations: Operation[] = []

        for (let tmp of allOperationsLike) {
            if (tmp instanceof OperationsGroup) {
                for (let op of (tmp as OperationsGroup).Operations) {
                    allOperations.push(op)
                }
            } else {
                allOperations.push(tmp as Operation)
            }
        }

        return allOperations
    }

    private findAllOperations(allOperations: OperationDashboardPair[]) {
        for (let child of this.Children) {
            if (child instanceof DashboardOutputLeaf) {
                for (let tmp of (child as DashboardOutputLeaf).Result) {
                    if (tmp instanceof OperationsGroup) {
                        for (let op of (tmp as OperationsGroup).Operations) {
                            allOperations.push(new OperationDashboardPair(op, child.Name))
                        }
                    } else {
                        allOperations.push(new OperationDashboardPair(tmp as Operation, child.Name))
                    }
                }
            } else {
                (child as DashboardOutput).findAllOperations(allOperations)
            }
        }
    }
}

class OperationDashboardPair {
    operation: Operation
    dashboardName: string

    constructor(operation: Operation, dashboardName: string) {
        this.operation = operation
        this.dashboardName = dashboardName
    }
}
