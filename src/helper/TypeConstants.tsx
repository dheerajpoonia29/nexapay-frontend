type Account = {
    accountNo: string,
    balance: number,
    userId: number
}

export type User = {
    name: string;
    email: string;
    accountData: Account | null;
};

export type Transaction = {
    transactionId: number,
    fromAccountNo: string,
    toAccountNo: string,
    amount: number,
    date: Date,
    status: boolean,
    statusInfo: string
};