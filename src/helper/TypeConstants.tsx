export type UserType = {
    name: string;
    email: string;
    account: AccountType | null;
};

export type BranchType = {
    branchName: string,
    ifscCode: string
}

export type BankType = {
    id: number,
    name: string,
    branches: BranchType[],
    branch: String
};

export type AccountType = {
    accountNo: string,
    balance: number,
    ifscCode: string,
    bank: BankType | null
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

export type UserFormDataType = {
    name?: string;
    email?: string;
    password?: string;
};

export type TransferFormDataType = {
    fromAccountNo?: string,
    toAccountNo?: string,
    amount?: number
};

export type AccountCreateFormDataType = {
    name?: string,
    email?: string,
    bankId?: number | null,
    ifscCode?: string | null
}