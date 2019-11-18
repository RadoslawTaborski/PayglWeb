import { DashboardOutputLeaf } from './DashboardOutputLeaf';
export class DashboardOutput {
    constructor(name, children) {
        this.Name = name;
        this.Children = children;
    }
    static createFromJson(data, frequencies, importances, tags, transactionTypes, transferTypes) {
        let dashboardOutput = new DashboardOutput();
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
        return dashboardOutput;
    }
}
//# sourceMappingURL=DashboardOutput.js.map