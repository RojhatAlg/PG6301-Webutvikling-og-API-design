import jwt from 'jwt-simple';

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt.decode(token, null, true); // Decode without verifying signature
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime; // Check if token is expired
  } catch (e) {
    return true; // Assume token is expired or invalid if decoding fails
  }
};

export const logout = (navigate) => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // Redirect to the login page
    navigate('/login');
  };
