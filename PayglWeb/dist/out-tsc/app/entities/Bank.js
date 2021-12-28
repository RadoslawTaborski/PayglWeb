export class Bank {
    static createFromJson(data) {
        let bank = new Bank();
        bank.Id = data.Id;
        bank.Name = data.Name;
        return bank;
    }
}
//# sourceMappingURL=Bank.js.map