import { TransactionType } from "./entities";

export interface Countable {
    Amount: number;
    TransactionType: TransactionType;
}