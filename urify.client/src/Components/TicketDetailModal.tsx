import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/BuildingModal.css'; // Estilo da modal

interface TicketDetailModalProps {
    isOpen: boolean;
    ticketId: number; // Changed 'int' to 'number'
    onRequestClose: () => void;
}

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
    // Other ticket properties
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ isOpen, ticketId, onRequestClose }) => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (ticketId) {
            const fetchTicket = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://localhost:7249/ticket/${ticketId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch ticket details');
                    }
                    const data = await response.json();
                    setTicket(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchTicket();
        }
    }, [ticketId]);

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

    return (
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
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>Erro: {error}</p>
                ) : ticket ? (
                    <>
                        <h2>Detalhes do Ticket ID: {ticket.ticketId}</h2>
                        <p><strong>Descrição:</strong> {ticket.description}</p>
                        <p><strong>Status:</strong> {getStatusText(ticket.status)}</p>
                        {ticket.image && <img src={`data:image/jpeg;base64,${ticket.image}`} alt="Ticket Image" className="ticket-image" />}
                        <p><strong>Criado por:</strong> {ticket.userName}</p>
                        <p><strong>Responsável:</strong> {ticket.workerName || 'Nenhum responsável atribuído'}</p>
                        <p><strong>Prédio:</strong> {ticket.buildingName}</p>
                        <p><strong>Data de Criação:</strong> {new Date(ticket.dateCreated).toLocaleDateString()}</p>
                        {/* Other ticket information */}
                    </>
                ) : (
                    <p>Selecione um ticket para ver os detalhes.</p>
                )}
            </div>
        </Modal>
    );
};

export default TicketDetailModal;
