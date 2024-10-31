import React from 'react';
import { Link, Navigate } from '@tanstack/react-location';

const Navbar = () => {
    const token = localStorage.getItem('authToken');
    const [loggedOut, setLoggedOut] = React.useState(false);

    const logout = () => {
        // Clear the token from localStorage and state on logout
        localStorage.removeItem('authToken');
        // Redirect to login page
        setLoggedOut(true);
    };

    if (loggedOut) {
        // Redirect to home page after logout
        return <Navigate to="/" />;
    }

    return (
        <nav className="bg-blue-500 text-white p-4 shadow-md">
            {
                token ? (
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/jobs" className="text-xl font-semibold hover:text-gray-200">
                            GitHub Jobs
                        </Link>
                        <div className="space-x-4">
                            <>
                                <Link to="/jobs" className="hover:text-gray-200">Job Listings</Link>
                                <button onClick={logout} className="hover:text-gray-200">Logout</button>
                            </>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-xl font-semibold hover:text-gray-200">
                            GitHub Jobs
                        </Link>
                        <div className="space-x-4">
                        </div>
                    </div>
                )
            }
            
        </nav>
    );
};

export default Navbar;
