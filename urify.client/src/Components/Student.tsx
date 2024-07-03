import React from 'react';
import UserModal from './UserModal';
import TicketModal from './TicketModal';
import { AuthorizeView } from './AuthorizeView.tsx';
import Map from './Map'
interface StudentProps {
    toggleUserModal: () => void;
    toggleTicketModal: () => void;
    isUserModalOpen: boolean;
    isTicketModalOpen: boolean;
}

const Student: React.FC<StudentProps> = ({
    toggleTicketModal,
    toggleUserModal,
    isTicketModalOpen,
    isUserModalOpen, }) => (
    <AuthorizeView>
    <>
            <header className="header">
                <div className="left-section">
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
            {isUserModalOpen && <UserModal />}
            {isTicketModalOpen && <TicketModal isOpen={isTicketModalOpen} onRequestClose={toggleTicketModal} />}
        <Map></Map>
        </>
    </AuthorizeView>
);

export default Student;
