import { useEffect } from 'react';
import type { TransferType, UserType } from '../helper/TypeConstants';
import { getTransfers } from '../client/TransferClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TransactionPage = ({
    user,
    transactions,
    setTransactions,
    hasFetched,
    setHasFetched
}: {
    user: UserType | null;
    transactions: TransferType[] | null;
    setTransactions: (val: TransferType[]) => void;
    hasFetched: boolean;
    setHasFetched: (val: boolean) => void;
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (user == null) {
            toast.warn("User not found, logging out!!");
            navigate('/logout');
        } else if (user.account == null) {
            toast.warn("Account not created yet!!");
            navigate('/welcome');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user?.account?.accountNo && !hasFetched) {
            setHasFetched(true)
            getTransfers({ accountNo: user?.account?.accountNo ?? "", setTransactions });
        }
    }, [user]);

    const handleRefresh = () => {
        if (user?.account?.accountNo) {
            getTransfers({ accountNo: user?.account?.accountNo ?? "", setTransactions });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-4xl text-gray-800">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Transfer History
                    </h2>
                    <button
                        onClick={handleRefresh}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Refresh
                    </button>
                </div>

                {transactions?.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No transactions found.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow-inner max-h-[450px] overflow-y-auto">
                        <table className="min-w-full table-auto text-sm text-left text-gray-700">
                            <thead className="bg-gray-100 sticky top-0 z-10 shadow">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">S.No</th>
                                    <th className="px-4 py-3 font-semibold">Date</th>
                                    <th className="px-4 py-3 font-semibold">Amount (₹)</th>
                                    <th className="px-4 py-3 font-semibold">Transfer Type</th>
                                    <th className="px-4 py-3 font-semibold">Account No</th>
                                    <th className="px-4 py-3 font-semibold">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions?.map((txn, idx) => {
                                    const isSent = txn.fromAccountNo === user?.account?.accountNo;
                                    return (
                                        <tr
                                            key={txn.transferId}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-center">{idx + 1}</td>
                                            <td className="px-4 py-3">
                                                {new Date(txn.date).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 font-medium">₹ {txn.amount}</td>
                                            <td className={`px-4 py-3 ${isSent ? 'text-red-600' : 'text-green-600'}`}>
                                                {isSent ? 'Debit' : 'Credit'}
                                            </td>
                                            <td className="px-4 py-3">{isSent ? txn.toAccountNo : txn.fromAccountNo}</td>
                                            <td className="px-4 py-3">{txn.transferId}</td>
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