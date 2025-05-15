import { useState } from 'react';
import type { User, Transaction } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import ValidateAccount from '../helper/ValidateAccount';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FetchAndUpdateTransaction = (user: User | null, setUser: (val: User) => void) => {
    console.log("fetching user information");

    const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`${BASE_URL}/account/get-by-account-no?accountNo=${user?.accountData?.accountNo}`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    })
        .then(res => res.json())
        .then(result => {
            console.log("api call success");
            if (result.responseStatusInt === 200) {
                console.log("success api call");
                const updatedUser = {
                    ...user,
                    name: user?.name ?? "",
                    email: user?.email ?? "",
                    accountData: result.responseData
                };
                setUser(updatedUser);
                toast.info("User account updated");
            } else {
                console.warn("Failed to fetch updated account info");
                toast.warn("Failed to fetch updated account info");
            }
        })
        .catch(err => {
            console.error("Error updating transaction/account: ", err);
            toast.error("Failed to fetch updated account info");
        });
};

const TransferPage = ({ user, setUser }: {
    user: User | null;
    setUser: (val: User) => void;
}) => {
    ValidateAuth(user, '/logout');
    ValidateAccount(user, '/welcome');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fromAccountNo: user?.accountData?.accountNo,
        toAccountNo: "",
        amount: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const BASE_URL = import.meta.env.VITE_API_BANK_API_URL;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.accountData?.accountNo) {
            toast.error("You don't have a valid source account.");
            return;
        }

        fetch(`${BASE_URL}/bank/transfer`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(formData),
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.responseStatusInt === 201) {
                    const responseData: Transaction = result.responseData;
                    if (responseData.status == true) {
                        toast.success("Transaction successful!");
                        // todo fetch account again
                        FetchAndUpdateTransaction(user, setUser);
                        // todo send some prop so that transaction auto refresh
                        navigate('/banking/transactions');
                    } else {
                        toast.warn(responseData.statusInfo);
                    }
                } else if (result.responseStatusInt === 404) {
                    toast.warn("Account not found");
                } else {
                    toast.error("Transaction failed");
                }
            })
            .catch((error) => {
                console.error("Internal server error: ", error);
                toast.error("Internal server error");
            });
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