import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Role is set to 'user' by default and is no longer part of the state
  const navigate = useNavigate(); // Use useNavigate here

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Role is set to 'user' by default and is not included in the request
      await axios.post('http://localhost:5000/users/register', { name, email, password });
      navigate('/login'); // Use navigate to redirect after registration
    } catch (error) {
      console.error('Error registering', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
