export class Language {
    Id: number;
    ShortName: string;
    FullName: string;

    constructor(id?: number, shortName?: string, fullName?: string) {
        this.Id = id
        this.ShortName = shortName
        this.FullName = fullName
    }

    static createFromJson(data: any): Language {
        let language = new Language()
        language.Id = data.Id
        language.ShortName = data.ShortName
        language.FullName = data.FullName

        return language;
    }
}

export class Details {
    Id: number;
    LastName: string;
    FirstName: string;

    constructor(id?: number, lastName?: string, firstName?: string) {
        this.Id = id
        this.LastName = lastName
        this.FirstName = firstName
    }

    static createFromJson(data: any): Details {
        let details = new Details()
        details.Id = data.Id
        details.LastName = data.LastName
        details.FirstName = data.FirstName

        return details;
    }
}

export class User {
    Id: number;
    Login: string;
    Language: Language;
    Details: Details;

    constructor(id?: number, login?: string, language?: Language, details?: Details) {
        this.Id = id
        this.Login = login
        this.Language = language
        this.Details = details
    }

    static createFromJson(data: any): User {
        let user = new User()
        user.Id = data.Id
        user.Login = data.Login
        user.Language = Language.createFromJson(data.Language)
        user.Details = Details.createFromJson(data.Details)

        return user;
    }
}

export class Frequency {
    Id: number;
    Text: string;

    constructor(id?: number, text?: string) {
        this.Id = id
        this.Text = text
    }

    static createFromJson(data: any): Frequency {
        let frequency = new Frequency()
        frequency.Id = data.Id
        frequency.Text = data.Text

        return frequency;
    }
}

export class Importance {
    Id: number;
    Text: string;

    constructor(id?: number, text?: string) {
        this.Id = id
        this.Text = text
    }

    static createFromJson(data: any): Importance {
        let importance = new Importance()
        importance.Id = data.Id
        importance.Text = data.Text

        return importance;
    }
}

export class Tag {
    Id: number;
    Text: string;

    constructor(id?: number, text?: string) {
        this.Id = id
        this.Text = text
    }

    static createFromJson(data: any): Tag {
        let tag = new Tag()
        tag.Id = data.Id
        tag.Text = data.Text

        return tag;
    }
}

export class TagRelation {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    Tag: Tag;

    constructor(id?: number, tag?: Tag) {
        this.Id = id
        this.Tag = tag
    }

    static createFromJson(data: any, tags: Tag[]): TagRelation {
        let tagRelation = new TagRelation()
        tagRelation.Id = data.Id
        tagRelation.Tag = tags.filter(t => t.Id === data.Tag.Id)[0]

        return tagRelation;
    }
}

export class TransactionType {
    Id: number;
    Text: string;

    constructor(id?: number, text?: string) {
        this.Id = id
        this.Text = text
    }

    static createFromJson(data: any): TransactionType {
        let transactionType = new TransactionType();
        transactionType.Id = data.Id
        transactionType.Text = data.Text

        return transactionType;
    }
}

export class TransferType {
    Id: number;
    Text: string;

    constructor(id?: number, text?: string) {
        this.Id = id
        this.Text = text
    }

    static createFromJson(data: any): TransferType {
        let transferType = new TransferType()
        transferType.Id = data.Id
        transferType.Text = data.Text

        return transferType;
    }
}

export class OperationDetails {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    Name: string;
    Quantity: number;
    Amount: number;

    constructor(id?: number, name?: string, quantity?:number, amount?:number) {
        this.Id = id
        this.Name = name
        this.Quantity = quantity
        this.Amount = amount
    }

    static createFromJson(data: any): OperationDetails {
        let operationDetails = new OperationDetails()
        operationDetails.Id = data.Id
        operationDetails.Name = data.Name
        operationDetails.Quantity = data.Quantity
        operationDetails.Amount = data.Amount

        return operationDetails;
    }
}

export class Filter implements IFilter {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    User: User;
    Name: string;
    Query: string;

    constructor(id?: number, user?: User, name?: string, query?: string) {
        this.Id = id
        this.User = user
        this.Name = name
        this.Query = query
    }

    static createFromJson(data: any): Filter {
        let filter = new Filter();
        filter.Id = data.Id;
        filter.User = User.createFromJson(data.User);
        filter.Name = data.Name
        filter.Query = data.Query
        return filter
    }
}

export class Dashboard implements IFilter {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    User: User;
    IsVisible: boolean;
    Name: string;
    Relations: DashboardFilterRelation[]

    constructor(id?: number, user?: User, name?: string, isVisible?: boolean, relations?: DashboardFilterRelation[]) {
        this.Id = id
        this.User = user
        this.Name = name
        this.IsVisible = isVisible
        this.Relations = relations
    }

    static createFromJson(data: any): Dashboard {
        let dashboard = new Dashboard()
        dashboard.Id = data.Id
        dashboard.User = User.createFromJson(data.User)
        dashboard.IsVisible = data.IsVisible
        dashboard.Name = data.Name
        dashboard.Relations=[]
        for (let relation of data.Relations) {
            dashboard.Relations.push(DashboardFilterRelation.createFromJson(relation))
        }
        return dashboard
    }
}

export class DashboardFilterRelation {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    Filter: IFilter;
    IsVisible: boolean;
    IndexOfNext: number;

    constructor(id?: number, filter?: IFilter, isVisible?: boolean, indexOfNext?: number) {
        this.Id = id
        this.Filter = filter
        this.IsVisible = isVisible
        this.IndexOfNext = indexOfNext
    }

    static createFromJson(data: any): DashboardFilterRelation {
        let relation = new DashboardFilterRelation();
        relation.Id = data.Id;
        relation.IsVisible = data.IsVisible
        relation.IndexOfNext = data.IndexOfNext
        if (data.Filter.Relations != undefined) {
            relation.Filter = Dashboard.createFromJson(data.Filter)
        } else {
            relation.Filter = Filter.createFromJson(data.Filter)
        }
        return relation
    }
}

export interface IFilter {
    Name: string
}
