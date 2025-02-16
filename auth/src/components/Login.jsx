import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Login successful!');
                setIsError(false);
                // You can add further actions here, such as redirecting the user
            } else {
                setMessage(result.msg);
                setIsError(true);
            }
        } catch (error) {
            setMessage('An error occurred during login.');
            setIsError(true);
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-full font-semibold hover:bg-blue-600 transition duration-200">
                        Login
                    </button>
                    {message && (
                        <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}
                </form>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
