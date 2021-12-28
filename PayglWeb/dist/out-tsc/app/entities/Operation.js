import { User, TagRelation, OperationDetails } from './entities';
export class Operation {
    constructor(id, groupId, user, amount, transactionType, transferType, frequency, importance, date, receiptPath, tags, operationDetails, description) {
        this.Tags = [];
        this.DetailsList = [];
        this.Id = id;
        this.GroupId = groupId;
        this.User = user;
        this.Amount = amount;
        this.TransactionType = transactionType;
        this.TransferType = transferType;
        this.Frequency = frequency;
        this.Importance = importance;
        this.Date = Operation.convertDate(date);
        this.ReceiptPath = receiptPath;
        if (tags != undefined) {
            this.Tags = tags;
        }
        if (operationDetails != undefined) {
            this.DetailsList = operationDetails;
        }
        this.Description = description;
    }
    static createFromJson(data, frequencies, importances, tags, transactionTypes, transferTypes, asNew = false) {
        let operation = new Operation();
        if (asNew) {
            operation.IsDirty = true;
            operation.IsMarkForDeletion = false;
        }
        operation.Id = data.Id;
        operation.GroupId = data.GroupId;
        operation.User = User.createFromJson(data.User);
        operation.Amount = data.Amount;
        if (data.TransactionType != null)
            operation.TransactionType = transactionTypes.filter(t => t.Id === data.TransactionType.Id)[0];
        if (data.TransferType != null)
            operation.TransferType = transferTypes.filter(t => t.Id === data.TransferType.Id)[0];
        if (data.Frequency != null)
            operation.Frequency = frequencies.filter(t => t.Id === data.Frequency.Id)[0];
        if (data.Importance != null)
            operation.Importance = importances.filter(t => t.Id === data.Importance.Id)[0];
        operation.Date = Operation.convertDate(data.Date);
        operation.ReceiptPath = data.ReceiptPath;
        operation.Tags = [];
        for (let tag of data.Tags) {
            operation.Tags.push(TagRelation.createFromJson(tag, tags, asNew));
        }
        operation.DetailsList = [];
        for (let detail of data.DetailsList) {
            operation.DetailsList.push(OperationDetails.createFromJson(detail, asNew));
        }
        operation.Description = data.Description;
        return operation;
    }
    static convertDate(st) {
        if (st == null) {
            return "";
        }
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        return st.replace(pattern, '$3-$2-$1');
    }
    markAllTagsForDeletion() {
        for (let i = 0; i < this.Tags.length; ++i) {
            let tag = this.Tags[i];
            tag.IsDirty = true;
            tag.IsMarkForDeletion = true;
        }
    }
    addTag(tag) {
        let filtered = this.Tags.filter(t => t.Tag.Text == tag.Tag.Text);
        if (filtered.length == 0) {
            tag.IsDirty = true;
            tag.IsMarkForDeletion = false;
            this.Tags.push(tag);
        }
        else {
            let old = filtered[0];
            old.IsMarkForDeletion = false;
        }
    }
    setTags(tags) {
        this.markAllTagsForDeletion();
        for (let tag of tags) {
            let tagRel = this.tagToNewTagRelation(tag);
            this.addTag(tagRel);
        }
    }
    tagToNewTagRelation(tag) {
        let result = new TagRelation(null, tag);
        result.IsDirty = true;
        return result;
    }
}
//# sourceMappingURL=Operation.js.map