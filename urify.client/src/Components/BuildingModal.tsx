import React from 'react';
import '../css/BuildingModal.css'; // Estilo da modal

interface Building {
    buildingId: number;
    name: string;
    tickets: Ticket[]; // Array de tickets
}

interface Ticket {
    ticketId: number;
    description: string;
    status: string;
    // Outras propriedades do ticket
}

interface BuildingModalProps {
    building: Building | null;
    onClose: () => void;
}

const BuildingModal: React.FC<BuildingModalProps> = ({ building, onClose }) => {
    if (!building) {
        return null; // Retorna nulo se não houver prédio selecionado
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>
                    ✖
                </span>
                <h2>Tickets de {building.name}</h2>
                <ul>
                    {building.tickets.map((ticket) => (
                        <li key={ticket.ticketId}>
                            <div>
                                <strong>ID: {ticket.ticketId}</strong>
                            </div>
                            <div>{ticket.description}</div>
                            <div>Status: {ticket.status}</div>
                            {/* Outras informações do ticket */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BuildingModal;
