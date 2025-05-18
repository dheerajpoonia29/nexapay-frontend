import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../helper/TypeConstants";
import { loginUser } from "../client/UserClient";

const LoginPage = ({ setIsLoggedIn, setUser }:
    {
        setIsLoggedIn: (val: boolean) => void;
        setUser: (val: UserType) => void
    }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("login data:", formData);
        const result = await loginUser({ setIsLoggedIn, setUser, formData });
        if (result) navigate('/welcome');
        else navigate('/');
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-400 p-20 shadow rounded w-full max-w-md text-white"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Login to NexaPay
                </h2>

                <div className="mb-4">
                    <label className="block text-sm mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="******"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;