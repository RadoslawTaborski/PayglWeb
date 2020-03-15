import { User, Frequency, Importance, Tag } from './entities';

export class Schematic {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    Type: SchematicType;
    Context: SchematicContext;
    User: User;

    constructor(id?: number, type?: SchematicType, context?: SchematicContext, user?: User) {
        this.Id = id
        this.Type = type
        this.Context = context
        this.User = user
    }

    static createFromJson(data: any, frequencies: Frequency[], importances: Importance[], tags: Tag[]): Schematic {
        let schematic = new Schematic()
        schematic.Id = data.Id
        schematic.Type = SchematicType.createFromJson(data.Type)
        schematic.Context = SchematicContext.createFromJson(data.Context, frequencies, importances, tags)
        schematic.User = User.createFromJson(data.User);
        return schematic;
    }

    toJson(): string {
        let tmp = new SchematicJson(this);
        let json = JSON.stringify(tmp)
        return json
    }
}

export class SchematicType {
    Id: number;
    Name: string;

    constructor(id?: number, name?: string) {
        this.Id = id
        this.Name = name
    }

    static createFromJson(data: any): SchematicType {
        let type = new SchematicType()
        type.Id = data.Id;
        type.Name = data.Name;
        return type;
    }
}

export class SchematicContext {
    DescriptionRegex: string;
    TitleRegex: string;
    Description: string;
    Frequency: Frequency = null
    Importance: Importance = null
    Tags: Tag[] = []

    constructor(descriptionRegex?: string, titleRegex?: string, description?: string, frequency?: Frequency, importance?: Importance, tags?: Tag[]) {
        this.DescriptionRegex = descriptionRegex
        this.TitleRegex = titleRegex
        this.Description = description
        this.Frequency = frequency
        this.Importance = importance
        this.Tags = tags
    }

    static createFromJson(data: any, frequencies: Frequency[], importances: Importance[], tags: Tag[]): SchematicContext {
        let schematic = new SchematicContext()
        schematic.DescriptionRegex = data.DescriptionRegex
        schematic.TitleRegex = data.TitleRegex
        schematic.Description = data.Description
        if (data.Frequency != null)
            schematic.Frequency = frequencies.filter(t => t.Text === data.Frequency)[0];
        if (data.Importance != null)
            schematic.Importance = importances.filter(t => t.Text === data.Importance)[0];

        schematic.Tags = [];
        if (data.Tags != null) {
            for (let tag of data.Tags) {
                schematic.Tags.push(tags.filter(t => t.Text === tag)[0]);
            }
        }

        return schematic;
    }
}

export class Schematics {
    Schematics: Schematic[];
}

class SchematicContextJson {
    DescriptionRegex: string;
    TitleRegex: string;
    Description: string;
    Frequency: string
    Importance: string
    Tags: string[] = []

    constructor(context: SchematicContext) {
        this.DescriptionRegex = context.DescriptionRegex
        this.TitleRegex = context.TitleRegex
        this.Description = context.Description
        if (context.Frequency != null)
            this.Frequency = context.Frequency.Text
        if (context.Importance != null)
            this.Importance = context.Importance.Text
        for (let tag of context.Tags) {
            this.Tags.push(tag.Text)
        }
    }
}

class SchematicJson {
    Id: number;
    IsDirty: boolean;
    IsMarkForDeletion: boolean;
    Type: SchematicType;
    Context: SchematicContextJson;
    User: User;

    constructor(schematic: Schematic) {
        this.Id = schematic.Id
        this.IsDirty = schematic.IsDirty
        this.IsMarkForDeletion = schematic.IsMarkForDeletion
        this.Type = schematic.Type
        this.User = schematic.User
        this.Context = new SchematicContextJson(schematic.Context)
    }
}