import { Operation } from './Operation';
import { User, TagRelation } from './entities';
export class OperationsGroup {
    constructor(id, user, description, frequency, importance, date, tags, operations) {
        this.Id = id;
        this.User = user;
        this.Description = description;
        this.Frequency = frequency;
        this.Importance = importance;
        this.Date = date;
        this.Tags = tags;
        this.Operations = operations;
    }
    static createFromJson(data, frequencies, importances, tags, transactionTypes, transferTypes) {
        let operationsGroup = new OperationsGroup();
        operationsGroup.Id = data.Id;
        operationsGroup.User = User.createFromJson(data.User);
        operationsGroup.Frequency = frequencies.filter(t => t.Id === data.Frequency.Id)[0];
        operationsGroup.Importance = importances.filter(t => t.Id === data.Importance.Id)[0];
        operationsGroup.Date = data.Date;
        operationsGroup.Tags = [];
        for (let tag of data.Tags) {
            operationsGroup.Tags.push(TagRelation.createFromJson(tag, tags));
        }
        operationsGroup.Operations = [];
        for (let operation of data.Operations) {
            operationsGroup.Operations.push(Operation.createFromJson(operation, frequencies, importances, tags, transactionTypes, transferTypes));
        }
        operationsGroup.Description = data.Description;
        return operationsGroup;
    }
}
//# sourceMappingURL=OperationsGroup.js.map