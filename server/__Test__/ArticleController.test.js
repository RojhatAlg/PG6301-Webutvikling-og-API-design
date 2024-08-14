import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Utils/AuthContext';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      setTimeout(() => {
        setErrorMessage(''); // Clear the error message after 3 seconds
      }, 3000);
      return; // Stop the function if validation fails
    }

    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      const { token, user } = response.data;
      login(token, user);
      navigate('/'); // Redirect to home or another page on successful login
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
        {errorMessage && <div className="login-error-popup">{errorMessage}</div>} {/* Error popup */}
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
