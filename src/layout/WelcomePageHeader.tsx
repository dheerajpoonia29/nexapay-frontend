import { Link } from "react-router-dom";

function WelcomePageHeader() {
    return (
        <header className="bg-gray-400 p-4 flex justify-between items-center">
            <div className="">
                <Link to="/welcome">
                    <button className="bg-gray-200 px-4 py-2 rounded">Home</button>
                </Link>
            </div>
            <div className="space-x-4">
                <Link to="/account">
                    <button className="bg-gray-200 px-4 py-2 rounded">Account</button>
                </Link>
            </div>
        </header>
    );
};

export default WelcomePageHeader;