import { IDashboardOutput } from './IDashboardOutput';
import { OperationLike } from './OperationLike';
import { OperationsGroup } from './OperationsGroup';
import { Frequency, Importance, Tag, TransactionType, TransferType } from './entities';
import { Operation } from './Operation';

export class DashboardOutputLeaf implements IDashboardOutput{
    Name: string
    Result: OperationLike[]

    constructor(name?: string, result?: OperationLike[]) {
        this.Name = name
        this.Result = result
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

        return dashboardOutput
    }
}