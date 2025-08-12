import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/admin" element={<AdminLogin/>} />
                <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}