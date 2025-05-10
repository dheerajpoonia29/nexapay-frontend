import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-400 p-4 flex justify-end space-x-4">
            <button className="bg-gray-200 px-4 py-2 rounded">Signup</button>
            <button className="bg-gray-200 px-4 py-2 rounded">Login</button>
        </header>
    );
};

export default Header;