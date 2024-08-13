import { Routes, Route, Naviagte } from 'react-router-dom';
import Test from '../test'

function AppRoutes() {
    return(
        <Routes>
            <Route path="/test" element={<Test />} />
        </Routes>
    )
}

export default AppRoutes;