import { Link } from "react-router-dom";

function HomePageHeader() {
    return (
        <header className="bg-gray-400 p-4 flex justify-between items-center">
            <div className="">
                <Link to="/">
                    <button className="bg-gray-200 px-4 py-2 rounded">Home</button>
                </Link>
            </div>
            <div className="space-x-4">
                <Link to="/signup">
                    <button className="bg-gray-200 px-4 py-2 rounded">Signup</button>
                </Link>
                <Link to="/login">
                    <button className="bg-gray-200 px-4 py-2 rounded">Login</button>
                </Link>
            </div>
        </header>
    );
};

export default HomePageHeader;