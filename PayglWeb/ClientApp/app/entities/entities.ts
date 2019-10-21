export class Language {
    Id: number;
    ShortName: string;
    FullName: string;
}

export class Details {
    Id: number;
    LastName: string;
    FirstName: string;
}

export class User {
    Id: number;
    Login: string;
    Language: Language;
    Details: Details;
}

export class Frequency {
    Id: number;
    Text: string;
}

export class Importance {
    Id: number;
    Text: string;
}

export class Tag {
    Id: number;
    Text: string;
}

export class TagRelation {
    Id: number;
    Tag: Tag;
}

export class TransactionType {
    Id: number;
    Text: string;
}

export class TransferType {
    Id: number;
    Text: string;
}

export class Operation {
    Id: number;
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
    DetailsList: any[];
    Description: string;
}

export class OperationsGroup {
    Id: number;
    User: User;
    Description: string;
    Frequency: Frequency;
    Importance: Importance;
    Date: string;
    Tags: TagRelation[];
    Operations: Operation[];
}
