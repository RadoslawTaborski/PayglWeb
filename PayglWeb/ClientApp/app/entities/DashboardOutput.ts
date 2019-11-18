import { IDashboardOutput } from './IDashboardOutput';
import { Frequency, Importance, Tag, TransactionType, TransferType } from './entities';
import { DashboardOutputLeaf } from './DashboardOutputLeaf';

export class DashboardOutput implements IDashboardOutput{
    Name: string
    Children: IDashboardOutput[]

    constructor(name?: string, children?: IDashboardOutput[]) {
        this.Name = name
        this.Children = children
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

        return dashboardOutput
    }
}
