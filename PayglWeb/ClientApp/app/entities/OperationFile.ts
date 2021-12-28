export class OperationFile {
    bankId: number
    file: File;
    fileName: string;

    constructor(bankId: number, fileName: string, file: File) {
        this.bankId = bankId;
        this.fileName = fileName;
        this.file = file
    }
}