import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { access_token } = await response.json();
      localStorage.setItem('authToken', access_token);
      window.location.href = '/jobs';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-white rounded shadow-md">
            <InputField 
              label="Username" 
              type="text" 
              name="username" 
              value={credentials.username} 
              onChange={handleChange} 
              placeholder="Enter your username" 
              required 
            />
            <InputField 
              label="Password" 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
              required 
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              disabled={loading}
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      className="w-full px-4 py-2 border rounded"
      {...props}
    />
  </div>
);

export default LoginPage;
