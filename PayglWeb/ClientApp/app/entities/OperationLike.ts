import { User, Frequency, Importance, TagRelation, TransactionType } from "./entities";
import { Countable } from './Countable';

export interface OperationLike extends Countable {
    Id: number;
    User: User;
    Frequency: Frequency;
    Importance: Importance;
    Date: string;
    Tags: TagRelation[];
    Description: string;
}