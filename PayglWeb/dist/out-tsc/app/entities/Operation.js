import { User, TagRelation, OperationDetails } from './entities';
export class Operation {
    constructor(id, groupId, user, amount, transactionType, transferType, frequency, importance, date, receiptPath, tags, operationDetails, description) {
        this.Id = id;
        this.GroupId = groupId;
        this.User = user;
        this.Amount = amount;
        this.TransactionType = transactionType;
        this.TransferType = transferType;
        this.Frequency = frequency;
        this.Importance = importance;
        this.Date = date;
        this.ReceiptPath = receiptPath;
        this.Tags = tags;
        this.DetailsList = operationDetails;
        this.Description = description;
    }
    static createFromJson(data, frequencies, importances, tags, transactionTypes, transferTypes) {
        let operation = new Operation();
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
        return operation;
    }
}
//# sourceMappingURL=Operation.js.map