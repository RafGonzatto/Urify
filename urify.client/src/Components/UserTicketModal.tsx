import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/BuildingModal.css'; // Estilo da modal
import TicketDetailModal from './TicketDetailModal'; // Componente da modal de detalhes do ticket
import { format } from 'date-fns';
interface Ticket {
    ticketId: number;
    description: string;
    status: number;
    image: string; // Base64 encoded string or image URL
    userId: string;
    userName: string;
    workerId: string | null;
    workerName: string | null;
    buildingId: number;
    buildingName: string;
    dateCreated: string;
    // Outras propriedades do ticket
}

interface UserTicketModalProps {
    isOpen: boolean;
    userEmail: string;
    onRequestClose: () => void;
}

const UserTicketModal: React.FC<UserTicketModalProps> = ({ isOpen, userEmail, onRequestClose }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        if (userEmail) {
            const fetchTickets = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://localhost:7249/Worker/worker-tickets?userEmail=${userEmail}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user tickets');
                    }
                    const data = await response.json();
                    setTickets(data);
                } catch (err) {
                    console.error('Error fetching user tickets:', err);
                    setError('Failed to fetch user tickets');
                } finally {
                    setLoading(false);
                }
            };

            fetchTickets();
        }
    }, [userEmail]);

    const getStatusText = (status: number) => {
        switch (status) {
            case 0:
                return 'Aberto';
            case 1:
                return 'Em processo';
            case 2:
                return 'Resolvido';
            default:
                return 'Desconhecido';
        }
    };

    const handleTicketClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
    };

    const handleCloseDetailModal = () => {
        setSelectedTicket(null);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-content">
                    <span className="close-modal" onClick={onRequestClose}>
                        ✖
                    </span>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && tickets.length === 0 && <p>No tickets found</p>}
                    {!loading && !error && tickets.length > 0 && (
                        <>
                            <h2>Meus Tickets</h2>
                            {tickets.map((ticket) => (
                                <button key={ticket.ticketId} onClick={() => handleTicketClick(ticket)} className="ticket-item">
                                    <h3>Ticket ID: {ticket.ticketId}</h3>
                                    <p><strong>Descrição:</strong> {ticket.description}</p>
                                    <p><strong>Data:</strong> {format(new Date(ticket.dateCreated), 'dd/MM/yyyy')}</p>
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </Modal>
            {selectedTicket && (
                <TicketDetailModal
                    isOpen={!!selectedTicket}
                    ticketId={selectedTicket.ticketId}
                    onRequestClose={handleCloseDetailModal}
                />
            )}
        </>
    );
};

export default UserTicketModal;
