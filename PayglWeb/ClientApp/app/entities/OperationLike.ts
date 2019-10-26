import { User, Frequency, Importance, TagRelation, TransactionType } from "./entities";

export interface OperationLike {
    Id: number;
    User: User;
    Frequency: Frequency;
    Importance: Importance;
    Amount: number;
    TransactionType: TransactionType;
    Date: string;
    Tags: TagRelation[];
    Description: string;
}