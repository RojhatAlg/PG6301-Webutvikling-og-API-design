import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Utils/AuthContext';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/users/login', { email, password });
        const { token, user } = response.data;

        // Store the token and user information (you may already have a function like this)
        login(token, user);

        // Check the user's role and navigate accordingly
        if (user.role === 'admin') {
            navigate('/admin/dashboard');  // Redirect to admin dashboard
        } else {
            navigate('/user-dashboard');  // Redirect to user dashboard
        }
    } catch (error) {
        console.error('Error logging in', error.response ? error.response.data : error.message);
        setErrorMessage('Wrong credentials, try again'); // Set the error message
        setTimeout(() => {
            setErrorMessage(''); // Clear the error message after 3 seconds
        }, 3000);
    }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {errorMessage && <div className="login-error-popup">{errorMessage}</div>}
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
