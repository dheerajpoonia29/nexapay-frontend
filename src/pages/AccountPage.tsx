import type { User } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';

const AccountPage = ({ user }: { user: User }) => {
    ValidateAuth(user, '/logout');

    return <>
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-gray-800">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-center text-blue-600">Account Details</h2>
                <div className="space-y-4 text-left">
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
        </div>
    </>
}

export default AccountPage;