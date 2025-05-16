import type { UserType } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';

const AccountPage = ({ user }: { user: UserType | null }) => {
    ValidateAuth(user, '/logout');

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 border-b pb-4">
                    User Account
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Personal Details */}
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
                        {user?.accountData != null ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-500">Account Number</label>
                                    <p className="text-lg font-medium">{user?.accountData?.accountNo}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Balance</label>
                                    {/* todo timely update account balance, can we make this cron job ?? */}
                                    <p className="text-lg font-medium">₹ {user?.accountData?.balance}</p>
                                </div>
                            </div>
                        ) : (<></>)}
                    </div>

                    {/* Bank Details */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                            Bank Information
                        </h3>
                        {user?.accountData != null ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-500">Account Number</label>
                                    <p className="text-lg font-medium">{user?.accountData?.accountNo}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500">Balance</label>
                                    {/* todo timely update account balance, can we make this cron job ?? */}
                                    <p className="text-lg font-medium">₹ {user?.accountData?.balance}</p>
                                </div>
                            </div>
                        ) : (<></>)}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AccountPage;