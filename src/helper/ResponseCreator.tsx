import type { AccountType, BankType, UserType, BranchType } from "./TypeConstants";

export function mapBackendUserToUserType(userResponse: any): UserType {
    console.log('mapping userResponse with user', userResponse);

    const accountResponse: AccountType = userResponse?.accountData ?? null;
    console.log('accountResponse', accountResponse);

    const bankResponse: BankType = userResponse?.accountData?.bankData ?? null;
    console.log('bankResponse', bankResponse);

    return {
        name: userResponse?.name ?? "",
        email: userResponse?.email ?? "",
        account: accountResponse != null ? {
            accountNo: accountResponse?.accountNo ?? "",
            balance: accountResponse?.balance ?? "",
            ifscCode: accountResponse?.ifscCode ?? "",
            bank: bankResponse != null ? {
                id: bankResponse?.id ?? "",
                name: bankResponse?.name ?? "",
                branches: bankResponse?.branches ?? "",
                branch: getBranchByIfscCode(accountResponse?.ifscCode, bankResponse?.branches)
            } : null
        } : null
    }
}

function getBranchByIfscCode(ifscCode: string, branches: BranchType[]): string {
    console.log('extracting branch with %s', ifscCode, ' from branches %O', branches);
    const foundBranch = branches?.find(branch => branch?.ifscCode === ifscCode);
    return foundBranch ? foundBranch?.branchName : "Unknown Branch";
}