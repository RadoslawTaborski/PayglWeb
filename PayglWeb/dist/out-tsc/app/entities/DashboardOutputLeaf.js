import { OperationsGroup } from './OperationsGroup';
import { Operation } from './Operation';
export class DashboardOutputLeaf {
    constructor(name, result) {
        this.Amount = 0;
        this.Name = name;
        if (result != null) {
            this.Result = result.sort((a, b) => (a.Date > b.Date) ? 1 : -1);
        }
    }
    recalculate(transactionTypes) {
        this.Amount = 0;
        for (let operationLike of this.Result) {
            if (operationLike.TransactionType.Text == "wydatek") {
                this.Amount -= operationLike.Amount;
            }
            else {
                this.Amount += operationLike.Amount;
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
        let dashboardOutput = new DashboardOutputLeaf();
        dashboardOutput.Name = data.Name;
        dashboardOutput.Result = [];
        for (let result of data.Result) {
            if (result.TransferType === undefined) {
                dashboardOutput.Result.push(OperationsGroup.createFromJson(result, frequencies, importances, tags, transactionTypes, transferTypes));
            }
            else {
                dashboardOutput.Result.push(Operation.createFromJson(result, frequencies, importances, tags, transactionTypes, transferTypes));
            }
        }
        dashboardOutput.Result = dashboardOutput.Result.sort((a, b) => (a.Date > b.Date) ? 1 : -1);
        dashboardOutput.recalculate(transactionTypes);
        return dashboardOutput;
    }
}
//# sourceMappingURL=DashboardOutputLeaf.js.map