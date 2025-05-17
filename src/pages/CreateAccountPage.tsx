import { useState } from 'react';
import type { UserType } from '../helper/TypeConstants';
import ValidateAuth from '../helper/ValidateAuth';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../client/AccountClient';

const CreateAccountPage = ({ user, setUser }:
    {
        user: UserType | null;
        setUser: (val: UserType) => void
    }) => {
    ValidateAuth(user, '/logout');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('calling create account client, formData', formData);
        await createAccount({ user, setUser, formData });
        navigate('/welcome');
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
                            name="name"
                            placeholder="ram sharma"
                            value={formData.name}
                            onChange={handleChange}
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
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
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