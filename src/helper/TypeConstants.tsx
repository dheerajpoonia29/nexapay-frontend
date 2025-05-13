export type User = {
    name: string;
    email: string;
    accountData: {
        accountNo: string,
        balance: number,
        userId: number
    }
};