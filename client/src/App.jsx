import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/routes';
import { AuthProvider } from './Components/Utils/AuthContext';
import Navbar from './Components/Navbar';

const App = () => (
    <Router>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </Router>
);

export default App;
