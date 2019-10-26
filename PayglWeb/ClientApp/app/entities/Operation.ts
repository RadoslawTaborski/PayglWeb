import { User, TransactionType, TransferType, Frequency, Importance, TagRelation, OperationDetails, Tag } from './entities';
import { OperationLike } from './OperationLike';

export class Operation implements OperationLike {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    GroupId: number;
    User: User;
    Amount: number;
    TransactionType: TransactionType;
    TransferType: TransferType;
    Frequency: Frequency;
    Importance: Importance;
    Date: string;
    ReceiptPath: string;
    Tags: TagRelation[];
    DetailsList: OperationDetails[];
    Description: string;

    constructor(id?: number, groupId?: number, user?: User, amount?: number, transactionType?: TransactionType, transferType?: TransferType, frequency?: Frequency, importance?: Importance, date?: string, receiptPath?: string, tags?: TagRelation[], operationDetails?: OperationDetails[], description?: string) {
        this.Id = id
        this.GroupId = groupId
        this.User = user
        this.Amount = amount
        this.TransactionType = transactionType
        this.TransferType = transferType    
        this.Frequency = frequency
        this.Importance = importance
        this.Date = date
        this.ReceiptPath = receiptPath
        this.Tags = tags
        this.DetailsList = operationDetails
        this.Description = description
    }

    static createFromJson(data: any, frequencies: Frequency[], importances: Importance[], tags: Tag[], transactionTypes: TransactionType[], transferTypes: TransferType[]): Operation {
        let operation = new Operation()
        operation.Id = data.Id;
        operation.GroupId = data.GroupId;
        operation.User = User.createFromJson(data.User);
        operation.Amount = data.Amount;
        operation.TransactionType = transactionTypes.filter(t => t.Id === data.TransactionType.Id)[0];
        operation.TransferType = transferTypes.filter(t => t.Id === data.TransferType.Id)[0];
        operation.Frequency = frequencies.filter(t => t.Id === data.Frequency.Id)[0];
        operation.Importance = importances.filter(t => t.Id === data.Importance.Id)[0];
        operation.Date = data.Date;
        operation.ReceiptPath = data.ReceiptPath;
        operation.Tags = [];
        for (let tag of data.Tags) {
            operation.Tags.push(TagRelation.createFromJson(tag, tags));
        }
        operation.DetailsList = [];
        for (let detail of data.DetailsList) {
            operation.DetailsList.push(OperationDetails.createFromJson(detail));
        }
        operation.Description = data.Description;

        return operation
    }
}
