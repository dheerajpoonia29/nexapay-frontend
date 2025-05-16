import { toast } from 'react-toastify';
import type { Transaction } from '../helper/TypeConstants';

const BASE_URL = import.meta.env.VITE_API_BANK_API_URL;

const getTransactions = async (
    accountNo: string,
    setTransactions: (val: Transaction[]) => void
) => {
    console.log('inside getTransactions')

    const ENDPOINT = '/bank/get-transfers';
    const URL = BASE_URL + ENDPOINT;

    try {
        const response = await fetch(`${URL}?accountNo=${accountNo}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        console.log("get transaction, result = ", result)

        if (result.responseStatusInt === 200) {
            const transactionList = result?.responseData as Transaction[];
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
};

export default getTransactions;