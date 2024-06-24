//import './css/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import UserSettings from './Pages/UserSettings.tsx';
//import { UserProvider, useUser } from './Contexts/UserContext';
import ChangePassword from './Components/ChangePassword.tsx';
//import AdminPage from './Pages/AdminPage';
//import WorkerPage from './Pages/WorkerPage';
//import StudentPage from './Pages/StudentPage';


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-user" element={<Login />} />
                <Route path="/add-user" element={<Register />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/change-password" element={<ChangePassword />} />
                {/*<Route path="/admin" element={<ProtectedRoute type={2}><AdminPage /></ProtectedRoute>} />*/}
                {/*<Route path="/worker" element={<ProtectedRoute type={1}><WorkerPage /></ProtectedRoute>} />*/}
                {/*<Route path="/student" element={<ProtectedRoute type={0}><StudentPage /></ProtectedRoute>} />*/}
                <Route path="*" element={<Navigate to="/login-user" />} />
            </Routes>
        </BrowserRouter>
    );
};

//interface ProtectedRouteProps {
//    children: React.ReactNode;
//    type?: number;
//}

//const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, type }) => {
//    const { user } = useUser();

//    if (!user) {
//        return <Navigate to="/login" />;
//    }

//    if (type !== undefined && user.type !== type) {
//        return <Navigate to="/home" />;
//    }

//    return <>{children}</>;
//};

export default App;