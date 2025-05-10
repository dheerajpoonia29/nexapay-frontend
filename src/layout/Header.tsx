import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-400 p-4 flex justify-end space-x-4">
            <Link to="/signup">
                <button className="bg-gray-200 px-4 py-2 rounded">Signup</button>
            </Link>
            <Link to="/login">
                <button className="bg-gray-200 px-4 py-2 rounded">Login</button>
            </Link>
        </header>
    );
};

export default Header;