import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-red-600">Quora</div>
            <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                    <button className="bg-gray-100 p-2 rounded">Home</button>
                    <button className="bg-gray-100 p-2 rounded">Spaces</button>
                    <button className="bg-gray-100 p-2 rounded">Notifications</button>
                </div>
                <input 
                    type="text" 
                    placeholder="Search Quora" 
                    className="border p-2 rounded w-64"
                />
                <button className="bg-red-600 text-white p-2 rounded">Add question</button>
            </div>
        </nav>
    );
};

export default Navbar;
