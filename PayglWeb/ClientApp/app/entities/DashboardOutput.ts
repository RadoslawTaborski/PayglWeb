import { IDashboardOutput } from './IDashboardOutput';
import { Frequency, Importance, Tag, TransactionType, TransferType } from './entities';
import { DashboardOutputLeaf } from './DashboardOutputLeaf';

export class DashboardOutput implements IDashboardOutput{
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
        console.log(data)
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
}
