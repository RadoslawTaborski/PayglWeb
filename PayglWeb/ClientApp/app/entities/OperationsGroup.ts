import { Operation } from './Operation';
import { User, Frequency, Importance, TagRelation, Tag, TransactionType, TransferType } from './entities';
import { OperationLike } from './OperationLike';
import { Countable } from './Countable';

export class OperationsGroup implements OperationLike, Countable{
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    User: User;
    Description: string;
    Frequency: Frequency;
    Importance: Importance;
    Date: string;
    Tags: TagRelation[];
    Operations: Operation[];

    Amount: number = 0;
    TransactionType: TransactionType;

    constructor(id?: number, user?: User, description?: string, frequency?: Frequency, importance?: Importance, date?: string, tags?: TagRelation[], operations?: Operation[]) {
        this.Id = id
        this.User = user
        this.Description = description
        this.Frequency = frequency
        this.Importance = importance
        this.Date = OperationsGroup.convertDate(date);
        this.Tags = tags
        if (operations != null) {
            this.Operations = operations.sort((a, b) => (a.Date > b.Date) ? 1 : -1)
        }
    }

    recalculate(transactionTypes: TransactionType[]) {
        this.Amount = 0;
        for (let operation of this.Operations) {
            if (operation.TransactionType.Text == "wydatek") {
                this.Amount -= operation.Amount;
            } else {
                this.Amount += operation.Amount;
            }        
        }
        if (this.Amount > 0) {
            this.TransactionType = transactionTypes.filter(t => t.Text == "przychód")[0];
        } else {
            this.TransactionType = transactionTypes.filter(t => t.Text == "wydatek")[0];
        }
        this.Amount = Math.abs(this.Amount);
    }

    static createFromJson(data: any, frequencies: Frequency[], importances: Importance[], tags: Tag[], transactionTypes: TransactionType[], transferTypes: TransferType[]): OperationsGroup {
        let operationsGroup = new OperationsGroup()
        operationsGroup.Operations = [];
        for (let operation of data.Operations) {
            operationsGroup.Operations.push(Operation.createFromJson(operation, frequencies, importances, tags, transactionTypes, transferTypes));
        }
        operationsGroup.Id = data.Id;
        operationsGroup.User = User.createFromJson(data.User);
        operationsGroup.Frequency = frequencies.filter(t => t.Id === data.Frequency.Id)[0];
        operationsGroup.Importance = importances.filter(t => t.Id === data.Importance.Id)[0];
        operationsGroup.Date = OperationsGroup.convertDate(data.Date);
        operationsGroup.Tags = [];
        for (let tag of data.Tags) {
            operationsGroup.Tags.push(TagRelation.createFromJson(tag, tags));
        }
        operationsGroup.Description = data.Description;
        operationsGroup.Operations = operationsGroup.Operations.sort((a, b) => (a.Date > b.Date) ? 1 : -1)
        operationsGroup.recalculate(transactionTypes);

        return operationsGroup
    }

    private static convertDate(st: string): string {
        if (st == null) {
            return ""
        }
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        return st.replace(pattern, '$3-$2-$1');
    }
}
