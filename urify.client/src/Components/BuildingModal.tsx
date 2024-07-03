import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/BuildingModal.css'; // Estilo da modal
import BuildingTicketModal from './BuildingTicketModal';

interface Ticket {
    ticketId: number;
    description: string;
    status: string;
    image: string; // Base64 encoded string or image URL
    // Outras propriedades do ticket
}

interface Building {
    buildingId: number;
    name: string;
    tickets: Ticket[]; // Array de tickets
}

interface BuildingModalProps {
    building: Building | null;
    onClose: () => void;
}

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

const BuildingModal: React.FC<BuildingModalProps> = ({ building, onClose }) => {
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

    const handleTicketClick = (ticketId: number) => {
        setSelectedTicketId(ticketId);
    };

    const closeTicketModal = () => {
        setSelectedTicketId(null);
    };

    return (
        <>
            <Modal
                isOpen={!!building}
                onRequestClose={onClose}
                className="modal"
                overlayClassName="modal-overlay"
                contentLabel={`Tickets de ${building && building.name}`}
            >
                <div className="modal-content">
                    <span className="close-modal" onClick={onClose}>
                        ✖
                    </span>
                    {building && (
                        <>
                            <h2>Tickets de {building.name}</h2>
                            <ul>
                                {building.tickets.map((ticket) => (
                                    <li key={ticket.ticketId}>
                                        <button className="ticket-button" onClick={() => handleTicketClick(ticket.ticketId)}>
                                            <div className="ticket-info">
                                                <h3>Ticket ID: {ticket.ticketId}</h3>
                                                <p><strong>Descrição:</strong> {ticket.description}</p>
                                                <p><strong>Status:</strong> {getStatusText(ticket.status)}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </Modal>

            {}
            <BuildingTicketModal ticketId={selectedTicketId} onClose={closeTicketModal} />
        </>
    );
};

export default BuildingModal;
