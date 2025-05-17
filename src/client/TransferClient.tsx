import { toast } from "react-toastify";
import type { TransferFormDataType, TransferType, UserType } from '../helper/TypeConstants';
import { getAccount } from "./AccountClient";

const BASE_URL_BANK = import.meta.env.VITE_API_BANK_API_URL;

interface GetTransfersProps {
    accountNo: string | null,
    setTransactions: (val: TransferType[]) => void
}

export const getTransfers = async ({ accountNo, setTransactions }: GetTransfersProps): Promise<void> => {
    console.log('inside getTransfers')

    const ENDPOINT = '/bank/get-transfers';
    const URL = BASE_URL_BANK + ENDPOINT;

    try {
        const response = await fetch(`${URL}?accountNo=${accountNo}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        console.log("get getTransfers, result = ", result)

        if (result.responseStatusInt === 200) {
            const transactionList = result?.responseData as TransferType[];
            const filteredTransactions = transactionList.filter(tx => tx.status === true);
            setTransactions(filteredTransactions);
            toast.info('Transactions fetched successfully');
        } else {
            toast.warn('Failed to fetch transactions');
        }
    } catch (err) {
        console.error(err);
        toast.error('Error fetching transactions');
    }
}

interface TransfersAmountProps {
    user: UserType | null;
    setUser: (val: UserType) => void;
    formData: TransferFormDataType | null;
}

export const sendTransfers = async ({ user, setUser, formData }: TransfersAmountProps): Promise<boolean> => {
    console.log('inside sendTransfers client');

    const ENDPOINT = '/bank/transfer';
    const URL = BASE_URL_BANK + ENDPOINT;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            redirect: "follow"
        });

        const result = await response.json();
        console.log("get transfer, result = ", result)

        if (result.responseStatusInt === 201) {
            console.log("success api call");
            const responseData: TransferType = result.responseData;
            if (responseData.status == true) {
                // update user account
                await getAccount({ user, setUser });
                toast.success("Transfer successful!");
                return true;
            } else {
                toast.warn(responseData.statusInfo);
            }
        } else if (result.responseStatusInt === 404) {
            toast.warn("Account not found");
        } else {
            console.error("status code: ", result.responseStatusInt);
            toast.error("Internal server error");
        }
    } catch (err) {
        console.error('tranferAmount error: ', err);
        toast.error('Internal server error');
    }

    return false;
}