import { DashboardOutputLeaf } from './DashboardOutputLeaf';
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
        console.log(data);
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
}
//# sourceMappingURL=DashboardOutput.js.map