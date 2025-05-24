import type { BranchType, AccountCreateFormDataType, BankType, UserType } from '../helper/TypeConstants';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../client/AccountClient';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextLoader from '../components/TextLoader';

interface Props {
    user: UserType | null;
    setUser: (val: UserType) => void;
    banks: BankType[] | null;
}

const CreateAccountPage = ({ user, setUser, banks }: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (user == null) {
            toast.warn("User not found, logging out!!");
            navigate('/logout');
        }
    }, [user, navigate]);

    const [branches, setBranches] = useState<BranchType[] | null>(null);

    const [formData, setFormData] = useState<AccountCreateFormDataType>({
        name: user?.name,
        email: user?.email ?? "",
        bankId: null,
        ifscCode: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "bankId") {
            const bankId = value === "" ? null : Number(value);
            const selectedBank = banks?.find(bank => bank.id === bankId);
            setBranches(selectedBank?.branches ?? null);

            setFormData((prev) => ({
                ...prev,
                [name]: bankId
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log('calling create account client, formData', formData);
        const result = await createAccount({ user, setUser, formData });
        setLoading(false);
        if (result)
            navigate('/welcome');
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            {loading ? (
                <TextLoader msg="Creating your bank account..." />
            ) : (
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
                    <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="ram sharma"
                                value={user?.name}
                                required
                                disabled
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                required
                                disabled
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="bank" className="block font-semibold mb-1">Select Bank</label>
                            <select
                                id="bankId"
                                name="bankId"
                                value={formData.bankId ?? ''}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a Bank</option>
                                {banks?.map((bank) => (
                                    <option key={bank.id} value={bank.id}>
                                        {bank.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="bank" className="block font-semibold mb-1">Select Branch</label>
                            <select
                                id="ifscCode"
                                name="ifscCode"
                                value={formData.ifscCode ?? ''}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a Branch</option>
                                {branches?.map((branch) => (
                                    <option key={branch.ifscCode} value={branch.ifscCode}>
                                        {branch.branchName} ({branch.ifscCode})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateAccountPage;