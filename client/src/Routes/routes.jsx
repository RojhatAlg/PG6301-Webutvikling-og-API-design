import { Routes, Route, Naviagte } from 'react-router-dom';
import Login from '../Auth/Login';

function AppRoutes() {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes;