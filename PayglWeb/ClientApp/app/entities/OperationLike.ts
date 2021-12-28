import { User, Frequency, Importance, TagRelation, TransactionType, Tag } from "./entities";
import { Countable } from './Countable';

export interface OperationLike extends Countable {
    Id: number;
    User: User;
    Frequency: Frequency;
    Importance: Importance;
    Date: string;
    Tags: TagRelation[];
    Description: string;

    markAllTagsForDeletion()
    addTag(tag: TagRelation)
    setTags(tags: Tag[])
    tagToNewTagRelation(tag: Tag): TagRelation

}