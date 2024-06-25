import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Admin from './Admin';
import Worker from './Worker';
import Student from './Student';
import '../css/App.css';

interface HeaderProps {
    userType: number;
    status: number;
}

const Header: React.FC<HeaderProps> = ({ userType, status }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false); // Adicionar estado para TicketModal

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserModal = () => setIsUserModalOpen(!isUserModalOpen);
    const toggleTicketModal = () => setIsTicketModalOpen(!isTicketModalOpen); // Adicionar função para TicketModal

    if (!status) {
        return <Navigate to="/login" />;
    }

    let content;
    switch (userType) {
        case 0:
            content = <Student toggleSidebar={toggleSidebar} toggleUserModal={toggleUserModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} />;
            break;
        case 1:
            content = <Worker toggleSidebar={toggleSidebar} toggleUserModal={toggleUserModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} />;
            break;
        case 2:
            content = <Admin toggleSidebar={toggleSidebar} toggleUserModal={toggleUserModal} toggleTicketModal={toggleTicketModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} isTicketModalOpen={isTicketModalOpen} />;
            break;
        default:
            content = null;
            break;
    }

    return (
        <div className="app">
            {content}
        </div>
    );
};

export default Header;
