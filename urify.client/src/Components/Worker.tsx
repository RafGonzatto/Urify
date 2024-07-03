import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import TicketModal from './TicketModal';
import UserModal from './UserModal';
import UserTicketModal from './UserTicketModal'; // Importar o componente da modal de tickets do usuário
import { AuthorizeView } from '../Components/AuthorizeView.tsx';
import { UserContext } from '../Components/AuthorizeView.tsx';
import Map from './Map';

interface WorkerProps {
    toggleSidebar: () => void;
    toggleUserModal: () => void;
    toggleTicketModal: () => void;
    isSidebarOpen: boolean;
    isUserModalOpen: boolean;
    isTicketModalOpen: boolean;
}

const Worker: React.FC<WorkerProps> = ({
    toggleSidebar,
    toggleUserModal,
    toggleTicketModal,
    isSidebarOpen,
    isUserModalOpen,
    isTicketModalOpen
}) => {
    const user = useContext(UserContext);
    const [userTicketsCount, setUserTicketsCount] = useState<number>(0);
    const [isUserTicketModalOpen, setIsUserTicketModalOpen] = useState<boolean>(false);

    useEffect(() => {
        // Lógica para buscar e contar os tickets do usuário logado
        const fetchUserTickets = async () => {
            try {
                const response = await fetch(`https://localhost:7249/Worker/worker-tickets?userEmail=${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user tickets');
                }
                const data = await response.json();
                setUserTicketsCount(data.length);
            } catch (err) {
                console.error('Error fetching user tickets:', err);
            }
        };

        fetchUserTickets();
    }, [user.email]);

    const toggleUserTicketModal = () => {
        setIsUserTicketModalOpen(!isUserTicketModalOpen);
    };

    return (
        <AuthorizeView>
            <>
                <header className="header">
                    <div className="left-section">
                        <button className="menu-btn" onClick={toggleSidebar}>
                            ☰
                        </button>
                        <button className="notification-btn" onClick={toggleUserTicketModal}>
                            <span className="bell-icon">🔔</span>
                            <span className="notification-count">{userTicketsCount}</span>
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
                {isTicketModalOpen && <TicketModal isOpen={isTicketModalOpen} onRequestClose={toggleTicketModal} />}
                {isUserTicketModalOpen && <UserTicketModal userEmail={user.email} isOpen={isUserTicketModalOpen} onRequestClose={toggleUserTicketModal} />}
                <Map />
            </>
        </AuthorizeView>
    );
};

export default Worker;
