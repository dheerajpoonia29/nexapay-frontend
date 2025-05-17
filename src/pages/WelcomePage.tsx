import { useEffect } from 'react';
import type { UserType } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import { Link } from "react-router-dom";

const WelcomePage = ({ user }: { user: UserType | null }) => {
    ValidateAuth(user, '/logout');

    useEffect(() => {

    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
                <h1 className="text-3xl font-bold">
                    Welcome <span className="text-indigo-600">{user?.name}</span> to NexaPay!
                </h1>

                {user?.account == null ? (
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
                    <div className="text-green-600 font-medium text-lg">
                        Your account is active. Enjoy NexaPay!
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;