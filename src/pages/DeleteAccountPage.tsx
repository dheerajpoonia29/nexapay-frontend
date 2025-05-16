import type { UserType } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import ValidateAccount from '../helper/ValidateAccount';
import { deleteAccount } from '../client/AccountClient';

const DeleteAccountPage = ({ user, setUser }:
    {
        user: UserType | null;
        setUser: (val: UserType) => void
    }) => {
    console.log("inside DeleteAccountPage")

    ValidateAuth(user, '/logout');
    ValidateAccount(user, '/welcome');

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-2xl text-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 border-b pb-4">
                    Delete Account
                </h2>

                <p className="text-lg text-gray-700 mb-6 text-center">
                    Are you sure you want to <span className="font-semibold text-red-500">permanently delete</span> your bank account?
                    <br />
                    This action cannot be undone.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => deleteAccount({ user, setUser })}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountPage;