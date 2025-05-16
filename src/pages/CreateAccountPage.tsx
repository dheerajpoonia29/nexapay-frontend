import { useState } from 'react';
import type { UserType } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const CreateAccountPage = ({ user, setUser }:
    {
        user: UserType | null;
        setUser: (val: UserType) => void
    }) => {
    ValidateAuth(user, '/logout');

    const navigate = useNavigate();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    const BASE_URL = import.meta.env.VITE_API_USER_AND_ACCOUNT_API_URL;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Create Account:', { name, email });

        fetch(`${BASE_URL}/account/create`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                "ifscCode": "hdfc002",
                "userRequest": {
                    "name": name,
                    "email": email
                },
                "bankRequest": {
                    "id": 1
                }
            }),
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.responseStatusInt == 201) {
                    if (result.responseData == null) {
                        toast.error("Create account api does not return account detail")
                        navigate('/welcome')
                    }
                    setUser({
                        ...user,
                        name: user?.name ?? "",
                        email: user?.email ?? "",
                        accountData: result?.responseData ?? null
                    });
                    toast.success("Bank account created successfully");
                    navigate('/welcome')
                } else if (result.responseStatusInt == 409) {
                    toast.success("Account already exist");
                } else {
                    toast.error("Something went wrong");
                }
            })
            .catch((error) => {
                console.error("iternal server error: ", error);
                toast.error("Internal server error");
            });
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block font-semibold mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountPage;