export class Bank {
    Id: number
    Name: string
    FileNamePrefix: string

    static createFromJson(data: any): Bank {
        let bank = new Bank();
        bank.Id = data.Id;
        bank.Name = data.Name;
        bank.FileNamePrefix = data.FileNamePrefix;

        return bank;
    }
}