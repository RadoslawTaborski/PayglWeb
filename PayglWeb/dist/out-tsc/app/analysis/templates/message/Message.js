export class Message {
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
    static messageIsWarning(message) {
        if (message == null) {
            return false;
        }
        if (message.type == MessageType.Warning) {
            return true;
        }
        return false;
    }
    static messageIsSuccess(message) {
        if (message == null) {
            return false;
        }
        if (message.type == MessageType.Success) {
            return true;
        }
        return false;
    }
    static messageIsError(message) {
        if (message == null) {
            return false;
        }
        if (message.type == MessageType.Error) {
            return true;
        }
        return false;
    }
}
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["Success"] = 1] = "Success";
    MessageType[MessageType["Warning"] = 2] = "Warning";
    MessageType[MessageType["Error"] = 3] = "Error";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=Message.js.map