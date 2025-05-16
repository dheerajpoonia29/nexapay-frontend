export type AccountType = {
    accountNo: string,
    balance: number,
    userId: number
}

export type UserType = {
    name: string;
    email: string;
    accountData: AccountType | null;
};

export type TransferType = {
    transferId: number,
    fromAccountNo: string,
    toAccountNo: string,
    amount: number,
    date: Date,
    status: boolean,
    statusInfo: string
};