import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-xl mx-4 sm:mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Welcome to My Auth App</h1>
                <p className="text-base md:text-lg text-gray-600 mb-6">Experience seamless authentication with our app</p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link to="/login" className="block sm:inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                        Login
                    </Link>
                    <Link to="/register" className="block sm:inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
