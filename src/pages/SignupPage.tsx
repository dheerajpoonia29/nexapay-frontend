import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Signup Data:", formData);

        // Send this data to your backend
        fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(formData),
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.responseStatusInt == 201) {
                    alert("account created successfully, please login")
                    navigate('/login')
                } else if (result.responseStatusInt == 409) {
                    alert("account already exist with provied email");
                } else {
                    alert("something went wrong");
                }
            })
            .catch((error) => {
                console.error("iternal server error: ", error);
                alert("internal server error");
            });
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-400 p-20 shadow rounded w-full max-w-md text-white"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Create your account
                </h2>

                <div className="mb-4">
                    <label className="block text-sm mb-2" htmlFor="email">
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
                    <label className="block text-sm mb-2" htmlFor="email">
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
        </div>
    );
};

export default SignupPage;