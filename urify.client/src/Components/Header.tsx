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
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserModal = () => setIsUserModalOpen(!isUserModalOpen);
    const toggleTicketModal = () => setIsTicketModalOpen(!isTicketModalOpen);
    const toggleApproveModal = () => setIsApproveModalOpen(!isApproveModalOpen);

    if (!status) {
        return <Navigate to="/login" />;
    }

    let content;
    switch (userType) {
        case 0:
            content = <Student toggleUserModal={toggleUserModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} toggleTicketModal={toggleTicketModal} />;
            break;
        case 1:
            content = <Worker
                toggleSidebar={toggleSidebar}
                toggleUserModal={toggleUserModal}
                toggleTicketModal={toggleTicketModal}
                isSidebarOpen={isSidebarOpen}
                isUserModalOpen={isUserModalOpen}
                isTicketModalOpen={isTicketModalOpen}
            />;
            break;
        case 2:
            content = (
                <Admin
                    toggleSidebar={toggleSidebar}
                    toggleUserModal={toggleUserModal}
                    toggleTicketModal={toggleTicketModal}
                    toggleApproveModal={toggleApproveModal} // Passando a função toggleApproveModal para o Admin
                    isSidebarOpen={isSidebarOpen}
                    isUserModalOpen={isUserModalOpen}
                    isTicketModalOpen={isTicketModalOpen}
                    isApproveModalOpen={isApproveModalOpen} // Passando o estado isApproveModalOpen para o Admin
                />
            );
            break;
        default:
            content = null;
            break;
    }

    return <div className="app">{content}</div>;
};

export default Header;
