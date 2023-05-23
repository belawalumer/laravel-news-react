import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_LOGIN_URL } from '../config/apiConfig'; // Import the API URL constant
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(API_LOGIN_URL, {
        email: email,
        password: password,
      });
      const token = response.data.token;
      // Save the token in local storage or a state management solution of your choice
      localStorage.setItem('token', token);
      setIsAuthenticated(true); // Set isAuthenticated to true
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded shadow p-8 w-1/3">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
