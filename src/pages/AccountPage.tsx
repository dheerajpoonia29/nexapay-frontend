import type { User } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import { Link } from "react-router-dom";

const AccountPage = ({ user }: { user: User | null }) => {
    ValidateAuth(user, '/logout');

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 border-b pb-4">
                    User Account
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                            Personal Information
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-500">Name</label>
                                <p className="text-lg font-medium">{user?.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500">Email</label>
                                <p className="text-lg font-medium">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                            Account Information
                        </h3>
                        {user?.accountData == null ? (
                            <div>
                                <p className="text-lg mb-4">You haven't created an account yet.</p>
                                <Link to="/create-account">
                                    <button
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-300"
                                    >
                                        Create Account
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-500">Account Number</label>
                                    <p className="text-lg font-medium">{user?.accountData?.accountNo}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Balance</label>
                                    <p className="text-lg font-medium">₹ {user?.accountData?.balance}</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;