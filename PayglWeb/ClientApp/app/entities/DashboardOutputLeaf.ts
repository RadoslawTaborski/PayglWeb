﻿import { IDashboardOutput } from './IDashboardOutput';
import { OperationLike } from './OperationLike';
import { OperationsGroup } from './OperationsGroup';
import { Frequency, Importance, Tag, TransactionType, TransferType } from './entities';
import { Operation } from './Operation';

export class DashboardOutputLeaf implements IDashboardOutput {
    Name: string
    Result: OperationLike[]

    Amount: number = 0;
    TransactionType: TransactionType;

    constructor(name?: string, result?: OperationLike[]) {
        this.Name = name
        if (result != null) {
            this.Result = result.sort((a, b) => (a.Date > b.Date) ? 1 : -1)
        }
    }

    recalculate(transactionTypes: TransactionType[]) {
        this.Amount = 0;
        for (let operationLike of this.Result) {
            if (operationLike.TransactionType.Text == "wydatek") {
                this.Amount -= operationLike.Amount;
            } else {
                this.Amount += operationLike.Amount;
            }
        }
        if (this.Amount > 0) {
            this.TransactionType = transactionTypes.filter(t => t.Text == "przychód")[0];
        } else {
            this.TransactionType = transactionTypes.filter(t => t.Text == "wydatek")[0];
        }
        this.Amount = Math.abs(this.Amount);
    }

    static createFromJson(data: any, frequencies: Frequency[], importances: Importance[], tags: Tag[], transactionTypes: TransactionType[], transferTypes: TransferType[]): DashboardOutputLeaf {
        let dashboardOutput = new DashboardOutputLeaf()
        dashboardOutput.Name = data.Name
        dashboardOutput.Result = []
        for (let result of data.Result) {
            if (result.TransferType === undefined) {
                dashboardOutput.Result.push(OperationsGroup.createFromJson(result, frequencies, importances, tags, transactionTypes, transferTypes))
            } else {
                dashboardOutput.Result.push(Operation.createFromJson(result, frequencies, importances, tags, transactionTypes, transferTypes))
            }
        }

        dashboardOutput.Result = dashboardOutput.Result.sort((a, b) => (a.Date > b.Date) ? 1 : -1)

        dashboardOutput.recalculate(transactionTypes);

        return dashboardOutput
    }
}