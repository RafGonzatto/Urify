import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/BuildingModal.css'; // Estilo da modal

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

interface BuildingTicketModalProps {
    ticketId: number | null;
    onClose: () => void;
}

const BuildingTicketModal: React.FC<BuildingTicketModalProps> = ({ ticketId, onClose }) => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [editable, setEditable] = useState<boolean>(false); // Estado para controlar a edição da combobox
    const [selectedWorker, setSelectedWorker] = useState<string | null>(null); // Estado para armazenar o trabalhador selecionado
    const [workers, setWorkers] = useState<string[]>([]); // Estado para armazenar os nomes de trabalhadores disponíveis

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

        const fetchWorkers = async () => {
            try {
                const response = await fetch('https://localhost:7249/Worker');
                if (!response.ok) {
                    throw new Error('Failed to fetch workers');
                }
                const data = await response.json();
                setWorkers(data);
            } catch (err) {
                console.error('Error fetching workers:', err);
            }
        };

        fetchWorkers();
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

    const handleAssignWorker = () => {
        // Lógica para atribuir um funcionário ao ticket
        console.log('Atribuir funcionário');
        setEditable(true); // Habilita a combobox para edição
    };

    const handleChangeWorker = () => {
        // Lógica para alterar o funcionário atribuído ao ticket
        console.log('Alterar funcionário');
        setEditable(true); // Habilita a combobox para edição
    };

    const handleSaveWorker = () => {
        // Lógica para salvar o funcionário selecionado
        console.log('Salvar funcionário:', selectedWorker);
        setEditable(false); // Desabilita a combobox após salvar
    };

    const handleCancelEdit = () => {
        // Lógica para cancelar a edição do funcionário
        console.log('Cancelar edição');
        setEditable(false); // Desabilita a combobox sem salvar
    };

    const handleWorkerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWorker(event.target.value);
    };

    return (
        <Modal
            isOpen={!!ticketId}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>
                    ✖
                </span>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {ticket && (
                    <>
                        <h2>Detalhes do Ticket ID: {ticket.ticketId}</h2>
                        <p><strong>Descrição:</strong> {ticket.description}</p>
                        <p><strong>Status:</strong> {getStatusText(ticket.status)}</p>
                        {ticket.image && <img src={`data:image/jpeg;base64,${ticket.image}`} alt="Ticket Image" className="ticket-image" />}
                        <p><strong>Usuário:</strong> {ticket.userName}</p>
                        {ticket.workerName ? (
                            <p><strong>Responsável:</strong> {editable ? (
                                <select value={selectedWorker || ''} onChange={handleWorkerChange} disabled={!editable}>
                                    <option value="">Selecione um trabalhador</option>
                                    {workers.map((worker) => (
                                        <option key={worker} value={worker}>
                                            {worker}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <>
                                    {ticket.workerName} <button onClick={handleChangeWorker}>✏️</button>
                                </>
                            )}
                            </p>
                        ) : (
                            <p><strong>Responsável:</strong> {editable ? (
                                <select value={selectedWorker || ''} onChange={handleWorkerChange} disabled={!editable}>
                                    <option value="">Selecione um trabalhador</option>
                                    {workers.map((worker) => (
                                        <option key={worker} value={worker}>
                                            {worker}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <button onClick={handleAssignWorker}>Atribuir Funcionário</button>
                            )}</p>
                        )}

                        {editable && (
                            <div className="worker-edit">
                                <button onClick={handleSaveWorker}>Salvar</button>
                                <button onClick={handleCancelEdit}>Cancelar</button>
                            </div>
                        )}
                        <p><strong>Prédio:</strong> {ticket.buildingName}</p>
                        <p><strong>Data de Criação:</strong> {new Date(ticket.dateCreated).toLocaleDateString()}</p>
                        {/* Outras informações do ticket */}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default BuildingTicketModal;
