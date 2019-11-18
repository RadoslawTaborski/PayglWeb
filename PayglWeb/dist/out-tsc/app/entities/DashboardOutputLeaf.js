import { OperationsGroup } from './OperationsGroup';
import { Operation } from './Operation';
export class DashboardOutputLeaf {
    constructor(name, result) {
        this.Name = name;
        this.Result = result;
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
        return dashboardOutput;
    }
}
//# sourceMappingURL=DashboardOutputLeaf.js.map