import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../client/UserClient";
import TextLoader from "../components/TextLoader";

const SignupPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log("Signup Data:", formData);
        const result = await signupUser({ formData });
        setLoading(false);
        if (result)
            navigate('/login');

    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            {loading ? (<TextLoader msg="Creating your user account..." />) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-400 p-20 shadow rounded w-full max-w-md text-white"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Create your user account
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="name">
                            Enter full name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="ram sharma"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="email">
                            Enter valid email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="password">
                            Enter password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="******"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            )}
        </div>
    );
};

export default SignupPage;