import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/routes'; // Import your routes
import { AuthProvider } from './Components/Utils/AuthContext';

const App = () => (
    <Router>
      <AuthProvider>
      <AppRoutes />
    </AuthProvider>
      
    </Router>
);

export default App;
