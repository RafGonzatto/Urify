import React from 'react';
import Sidebar from './Sidebar';
import UserModal from './UserModal';
import TicketModal from './TicketModal';
import { AuthorizeView } from '../Components/AuthorizeView.tsx';

interface AdminProps {
    toggleSidebar: () => void;
    toggleUserModal: () => void;
    toggleTicketModal: () => void;
    isSidebarOpen: boolean;
    isUserModalOpen: boolean;
    isTicketModalOpen: boolean;
}

const Admin: React.FC<AdminProps> = ({ toggleSidebar, toggleUserModal, toggleTicketModal, isSidebarOpen, isUserModalOpen, isTicketModalOpen }) => (
    
        <AuthorizeView>
    <>
        <header className="header">
            <button className="menu-btn" onClick={toggleSidebar}>
                ☰
            </button>
            <div className="search-bar-container">
                <input type="text" className="search-bar" placeholder="Search..." />
                <span className="search-icon">🔍</span>
            </div>
            <button className="ticket-btn" onClick={toggleTicketModal}> Criar ticket
            </button>
            <button className="user-icon" onClick={toggleUserModal}>
                👤
            </button>
        </header>
        {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
        {isUserModalOpen && <UserModal />}
        {isTicketModalOpen && <TicketModal isOpen={isTicketModalOpen} onRequestClose={toggleTicketModal} />}
        <main className="content">
            <p>Restante não implementado do site para Admin</p>
        </main>
        </>
    </AuthorizeView >
);

export default Admin;
