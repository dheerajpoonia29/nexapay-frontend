import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutPage = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsLoggedIn(false);
        console.log('logging out');
        toast.warn("Logout successfully");
        navigate('/');
    };


    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-2xl text-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 border-b pb-4">
                    Logout Confirmation
                </h2>

                <p className="text-lg text-gray-700 mb-6 text-center">
                    Are you sure you want to <span className="font-semibold text-red-500">logut</span> your bank account?
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => handleSubmit()}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutPage;