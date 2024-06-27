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
                                        <button onClick={() => handleTicketClick(ticket.ticketId)}>
                                            <div>
                                                <strong>ID: {ticket.ticketId}</strong>
                                            </div>
                                            <div>{ticket.description}</div>
                                            <div>Status: {ticket.status}</div>
                                            {/* Outras informações do ticket */}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </Modal>

            {/* Renderiza a BuildingTicketModal se um ticket estiver selecionado */}
            <BuildingTicketModal ticketId={selectedTicketId} onClose={closeTicketModal} />
        </>
    );
};

export default BuildingModal;
