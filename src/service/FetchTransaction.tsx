import { toast } from 'react-toastify';
import type { Transaction } from '../helper/TypeConstants';

const FetchTransaction = async (
    accountNo: string,
    setTransactions: (val: Transaction[]) => void
) => {
    const BASE_URL = import.meta.env.VITE_API_BANK_API_URL;
    try {
        const response = await fetch(`${BASE_URL}/bank/get-transfers?accountNo=${accountNo}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        if (result.responseStatusInt === 200) {
            console.log("transaction = ", result?.responseData)
            const transactionList = result?.responseData as Transaction[];
            const filteredTransactions = transactionList.filter(tx => tx.status === true);
            setTransactions(filteredTransactions);  // Use filteredTransactions here

            toast.info('Transactions fetched successfully');
        } else {
            toast.warn('Failed to fetch transactions');
        }
    } catch (err) {
        console.error(err);
        toast.error('Error fetching transactions');
    }
};

export default FetchTransaction;