import { User } from './entities';
export class Schematic {
    constructor(id, type, context, user) {
        this.Id = id;
        this.Type = type;
        this.Context = context;
        this.User = user;
    }
    static createFromJson(data, frequencies, importances, tags) {
        let schematic = new Schematic();
        schematic.Id = data.Id;
        schematic.Type = SchematicType.createFromJson(data.Type);
        schematic.Context = SchematicContext.createFromJson(data.Context, frequencies, importances, tags);
        schematic.User = User.createFromJson(data.User);
        return schematic;
    }
    toJson() {
        let tmp = new SchematicJson(this);
        let json = JSON.stringify(tmp);
        return json;
    }
}
export class SchematicType {
    constructor(id, name) {
        this.Id = id;
        this.Name = name;
    }
    static createFromJson(data) {
        let type = new SchematicType();
        type.Id = data.Id;
        type.Name = data.Name;
        return type;
    }
}
export class SchematicContext {
    constructor(descriptionRegex, titleRegex, description, frequency, importance, tags) {
        this.Frequency = null;
        this.Importance = null;
        this.Tags = [];
        this.DescriptionRegex = descriptionRegex;
        this.TitleRegex = titleRegex;
        this.Description = description;
        this.Frequency = frequency;
        this.Importance = importance;
        this.Tags = tags;
    }
    static createFromJson(data, frequencies, importances, tags) {
        let schematic = new SchematicContext();
        schematic.DescriptionRegex = data.DescriptionRegex;
        schematic.TitleRegex = data.TitleRegex;
        schematic.Description = data.Description;
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
}
class SchematicContextJson {
    constructor(context) {
        this.Tags = [];
        this.DescriptionRegex = context.DescriptionRegex;
        this.TitleRegex = context.TitleRegex;
        this.Description = context.Description;
        if (context.Frequency != null)
            this.Frequency = context.Frequency.Text;
        if (context.Importance != null)
            this.Importance = context.Importance.Text;
        for (let tag of context.Tags) {
            this.Tags.push(tag.Text);
        }
    }
}
class SchematicJson {
    constructor(schematic) {
        this.Id = schematic.Id;
        this.IsDirty = schematic.IsDirty;
        this.IsMarkForDeletion = schematic.IsMarkForDeletion;
        this.Type = schematic.Type;
        this.User = schematic.User;
        this.Context = new SchematicContextJson(schematic.Context);
    }
}
//# sourceMappingURL=Schematic.js.map