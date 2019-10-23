export class Language {
    constructor(id, shortName, fullName) {
        this.Id = id;
        this.ShortName = shortName;
        this.FullName = fullName;
    }
    static createFromJson(data) {
        let language = new Language();
        language.Id = data.Id;
        language.ShortName = data.ShortName;
        language.FullName = data.FullName;
        return language;
    }
}
export class Details {
    constructor(id, lastName, firstName) {
        this.Id = id;
        this.LastName = lastName;
        this.FirstName = firstName;
    }
    static createFromJson(data) {
        let details = new Details();
        details.Id = data.Id;
        details.LastName = data.LastName;
        details.FirstName = data.FirstName;
        return details;
    }
}
export class User {
    constructor(id, login, language, details) {
        this.Id = id;
        this.Login = login;
        this.Language = language;
        this.Details = details;
    }
    static createFromJson(data) {
        let user = new User();
        user.Id = data.Id;
        user.Login = data.Login;
        user.Language = Language.createFromJson(data.Language);
        user.Details = Details.createFromJson(data.Details);
        return user;
    }
}
export class Frequency {
    constructor(id, text) {
        this.Id = id;
        this.Text = text;
    }
    static createFromJson(data) {
        let frequency = new Frequency();
        frequency.Id = data.Id;
        frequency.Text = data.Text;
        return frequency;
    }
}
export class Importance {
    constructor(id, text) {
        this.Id = id;
        this.Text = text;
    }
    static createFromJson(data) {
        let importance = new Importance();
        importance.Id = data.Id;
        importance.Text = data.Text;
        return importance;
    }
}
export class Tag {
    constructor(id, text) {
        this.Id = id;
        this.Text = text;
    }
    static createFromJson(data) {
        let tag = new Tag();
        tag.Id = data.Id;
        tag.Text = data.Text;
        return tag;
    }
}
export class TagRelation {
    constructor(id, tag) {
        this.Id = id;
        this.Tag = tag;
    }
    static createFromJson(data, tags) {
        let tagRelation = new TagRelation();
        tagRelation.Id = data.Id;
        tagRelation.Tag = tags.filter(t => t.Id === data.Tag.Id)[0];
        return tagRelation;
    }
}
export class TransactionType {
    constructor(id, text) {
        this.Id = id;
        this.Text = text;
    }
    static createFromJson(data) {
        let transactionType = new TransactionType();
        transactionType.Id = data.Id;
        transactionType.Text = data.Text;
        return transactionType;
    }
}
export class TransferType {
    constructor(id, text) {
        this.Id = id;
        this.Text = text;
    }
    static createFromJson(data) {
        let transferType = new TransferType();
        transferType.Id = data.Id;
        transferType.Text = data.Text;
        return transferType;
    }
}
export class OperationDetails {
    constructor(id, name, quantity, amount) {
        this.Id = id;
        this.Name = name;
        this.Quantity = quantity;
        this.Amount = amount;
    }
    static createFromJson(data) {
        let operationDetails = new OperationDetails();
        operationDetails.Id = data.Id;
        operationDetails.Name = data.TNameext;
        operationDetails.Quantity = data.Quantity;
        operationDetails.Amount = data.Amount;
        return operationDetails;
    }
}
//# sourceMappingURL=entities.js.map