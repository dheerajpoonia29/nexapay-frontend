import { useEffect } from 'react';
import { toast } from 'react-toastify';
import type { Transaction, User } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import ValidateAccount from '../helper/ValidateAccount';

const FetchTransaction = async (
    accountNo: string,
    setTransactions: (val: Transaction[]) => void
) => {
    const BASE_URL = import.meta.env.VITE_API_BANK_API_URL;
    try {
        const response = await fetch(`${BASE_URL}/bank/get-transactions?accountNo=${accountNo}`, {
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

const TransactionPage = ({
    user,
    transactions,
    setTransactions,
    hasFetched,
    setHasFetched
}: {
    user: User | null;
    transactions: Transaction[];
    setTransactions: (val: Transaction[]) => void;
    hasFetched: boolean;
    setHasFetched: (val: boolean) => void;
}) => {
    ValidateAuth(user, '/logout');
    ValidateAccount(user, '/welcome');

    useEffect(() => {
        if (user?.accountData?.accountNo && !hasFetched) {
            setHasFetched(true)
            FetchTransaction(user.accountData.accountNo, setTransactions);
        }
    }, [user]);

    const handleRefresh = () => {
        if (user?.accountData?.accountNo) {
            FetchTransaction(user.accountData.accountNo, setTransactions);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-4xl text-gray-800">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Transaction History
                    </h2>
                    <button
                        onClick={handleRefresh}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Refresh
                    </button>
                </div>

                {transactions.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No transactions found.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow-inner max-h-[450px] overflow-y-auto">
                        <table className="min-w-full table-auto text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 sticky top-0 z-10 shadow">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">S.No</th>
                                    <th className="px-4 py-3 font-semibold">Date</th>
                                    <th className="px-4 py-3 font-semibold">Amount (₹)</th>
                                    <th className="px-4 py-3 font-semibold">Credit/Debit</th>
                                    <th className="px-4 py-3 font-semibold">Account No</th>
                                    <th className="px-4 py-3 font-semibold">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.map((txn, idx) => {
                                    const isSent = txn.fromAccountNo === user?.accountData?.accountNo;
                                    return (
                                        <tr
                                            key={txn.transactionId}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-center">{idx + 1}</td>
                                            <td className="px-4 py-3">
                                                {new Date(txn.date).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 font-medium">₹ {txn.amount}</td>
                                            <td className={`px-4 py-3 ${isSent ? 'text-red-600' : 'text-green-600'}`}>
                                                {isSent ? 'Sent' : 'Recieved'}
                                            </td>
                                            <td className="px-4 py-3">{isSent ? txn.toAccountNo : txn.fromAccountNo}</td>
                                            <td className="px-4 py-3 text-xs break-all">{txn.transactionId}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionPage;