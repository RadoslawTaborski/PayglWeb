export class Message {
    public type: MessageType
    public message: string

    constructor(type: MessageType, message: string) {
        this.type = type
        this.message = message
    }

    public static messageIsWarning(message: Message) {
        if (message == null) {
            return false;
        }
        if (message.type == MessageType.Warning) {
            return true;
        }
        return false;
    }

    public static messageIsSuccess(message: Message) {
        if (message == null) {
            return false;
        }
        if (message.type == MessageType.Success) {
            return true;
        }
        return false;
    }

    public static messageIsError(message: Message) {
        if (message == null) {
            return false;
        }
        if (message.type == MessageType.Error) {
            return true;
        }
        return false;
    }
}

export enum MessageType {
    Success = 1,
    Warning = 2,
    Error = 3
}