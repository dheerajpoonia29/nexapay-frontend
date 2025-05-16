export type UserType = {
    name: string;
    email: string;
    accountData: AccountType | null;
};

export type BranchType = {
    branchName: string,
    ifscCode: string
}

export type BankType = {
    id: number,
    name: string,
    branches: BranchType[]
};

export type AccountType = {
    accountNo: string,
    balance: number,
    ifscCode: string,
    user: UserType,
    bank: BankType
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