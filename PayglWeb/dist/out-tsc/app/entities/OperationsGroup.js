import { Operation } from './Operation';
import { User, TagRelation } from './entities';
export class OperationsGroup {
    constructor(id, user, description, frequency, importance, date, tags, operations) {
        this.Tags = [];
        this.Operations = [];
        this.Amount = 0;
        this.Id = id;
        this.User = user;
        this.Description = description;
        this.Frequency = frequency;
        this.Importance = importance;
        this.Date = OperationsGroup.convertDate(date);
        if (tags != undefined) {
            this.Tags = tags;
        }
        if (operations != null && operations != undefined) {
            this.Operations = operations.sort((a, b) => (a.Date > b.Date) ? 1 : -1);
        }
    }
    recalculate(transactionTypes) {
        this.Amount = 0;
        for (let operation of this.Operations) {
            if (operation.TransactionType.Text == "wydatek") {
                this.Amount -= operation.Amount;
            }
            else {
                this.Amount += operation.Amount;
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
        let operationsGroup = new OperationsGroup();
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
        operationsGroup.Operations = operationsGroup.Operations.sort((a, b) => (a.Date > b.Date) ? 1 : -1);
        operationsGroup.recalculate(transactionTypes);
        return operationsGroup;
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
            this.Tags.push(tag);
        }
        else {
            let old = filtered[0];
            old.IsDirty = false;
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
//# sourceMappingURL=OperationsGroup.js.map