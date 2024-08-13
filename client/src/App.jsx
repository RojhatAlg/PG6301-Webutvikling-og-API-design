import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/routes'; // Import your routes

const App = () => (
    <Router>
      <AppRoutes />
    </Router>
);

export default App;
