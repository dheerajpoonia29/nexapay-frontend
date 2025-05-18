import { useEffect, useState } from 'react';
import type { UserType, TransferFormDataType, TransferType } from '../helper/TypeConstants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTransfers, sendTransfers } from '../client/TransferClient';

const TransferPage = ({ user, setUser, setTransactions }: {
    user: UserType | null;
    setUser: (val: UserType) => void;
    setTransactions: (val: TransferType[]) => void;
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

    const [formData, setFormData] = useState<TransferFormDataType>({
        fromAccountNo: user?.account?.accountNo,
        toAccountNo: "",
        amount: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.account?.accountNo) {
            toast.error("You don't have a valid source account.");
            return;
        }

        const result: boolean = await sendTransfers({ user, setUser, formData });
        if (result) {
            // await getTransfers({ user, setUser });
            getTransfers({ accountNo: user?.account.accountNo, setTransactions });
            navigate('/banking/transactions');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
                <h2 className="text-2xl font-bold text-center mb-6">Transfer Funds</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="fromAccount" className="block font-semibold mb-1">From Account</label>
                        <input
                            id="fromAccount"
                            name="fromAccountNo"
                            type="text"
                            value={formData?.fromAccountNo || ''}
                            disabled
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="toAccount" className="block font-semibold mb-1">To Account</label>
                        <input
                            id="toAccount"
                            name="toAccountNo"
                            type="text"
                            value={formData?.toAccountNo || ''}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block font-semibold mb-1">Amount</label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            value={formData?.amount || ''}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Send Money
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransferPage;