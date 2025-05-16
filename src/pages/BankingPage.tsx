import type { UserType } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import ValidateAccount from '../helper/ValidateAccount';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";


const BankingPage = ({ user }:
    {
        user: UserType | null;
    }) => {
    ValidateAuth(user, '/logout');
    ValidateAccount(user, '/welcome');

    const bankingOptions = [
        // { label: "Deposit", route: "/banking/deposit" },
        // { label: "Withdraw", route: "/banking/withdraw" },
        { label: "Transfer", route: "/banking/transfer" },
        { label: "Transactions", route: "/banking/transactions" },
        { label: "Delete Account", route: "/banking/delete" }
    ];

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl text-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 border-b pb-4">
                    Banking Services
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {bankingOptions.map((option) => (
                        <Link to={option.route} key={option.label}>
                            <button
                                className="w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white py-4 px-5 rounded-xl text-lg font-medium transition duration-300 transform hover:scale-[1.02] shadow-md">
                                <span>{option.label}</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BankingPage;