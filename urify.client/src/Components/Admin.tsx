import React from 'react';
import Sidebar from './Sidebar';
import UserModal from './UserModal';
import TicketModal from './TicketModal';
import ApproveModal from './ApproveModal'; // Importe o ApproveModal aqui
import { AuthorizeView } from './AuthorizeView.tsx';
import Map from './Map'
interface AdminProps {
    toggleSidebar: () => void;
    toggleUserModal: () => void;
    toggleTicketModal: () => void;
    toggleApproveModal: () => void;
    isSidebarOpen: boolean;
    isUserModalOpen: boolean;
    isTicketModalOpen: boolean;
    isApproveModalOpen: boolean;
}

const Admin: React.FC<AdminProps> = ({
    toggleSidebar,
    toggleUserModal,
    toggleTicketModal,
    toggleApproveModal,
    isSidebarOpen,
    isUserModalOpen,
    isTicketModalOpen,
    isApproveModalOpen,
}) => (
    <AuthorizeView>
        <>
            <header className="header">
                <div className="left-section">
                <button className="menu-btn" onClick={toggleSidebar}>
                    ☰
                </button>
            
                <button className="btn-pattern" onClick={toggleApproveModal}>
                    Aprovar Usuários
                    </button>
                </div>
                <div className="right-section">
                <button className="btn-pattern" onClick={toggleTicketModal}>
                    Criar Ticket
                </button>
                <button className="user-icon" onClick={toggleUserModal}>
                    👤
                </button>
                </div>
            </header>
            {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
            {isUserModalOpen && <UserModal />}
            {isApproveModalOpen && <ApproveModal isOpen={isApproveModalOpen} onRequestClose={toggleApproveModal} />}
            {isTicketModalOpen && <TicketModal isOpen={isTicketModalOpen} onRequestClose={toggleTicketModal} />}
            <Map></Map>
        </>
    </AuthorizeView>
);

export default Admin;
