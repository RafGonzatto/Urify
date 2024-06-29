import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';
import BuildingModal from './BuildingModal'; // Importa o componente BuildingModal

interface Building {
    buildingId: number;
    name: string;
    ticketCount: number;
    tickets: Ticket[]; // Adiciona a propriedade de tickets ao prédio
}

interface Ticket {
    ticketId: number;
    description: string;
    status: string;
    // Outras propriedades do ticket
}

interface SidebarProps {
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [showOnlyWithTickets, setShowOnlyWithTickets] = useState<boolean>(false);
    const [showOnlyWithOpenTickets, setShowOnlyWithOpenTickets] = useState<boolean>(false);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await fetch('https://localhost:7249/building/all-buildings');
                if (!response.ok) {
                    throw new Error('Failed to fetch buildings');
                }
                const data = await response.json();
                let filteredData = data;
                if (showOnlyWithTickets) {
                    filteredData = filteredData.filter((building: Building) => building.ticketCount > 0);
                } 
                if (showOnlyWithOpenTickets) {
                    debugger
                    console.log(filteredData)
                    filteredData = filteredData.filter((building: Building) =>
                        building.tickets.some((ticket: Ticket) => ticket.status === 0)
                    );
                }
                const formattedData = filteredData.map((building: Building) => ({
                    buildingId: building.buildingId,
                    name: building.name,
                    ticketCount: building.ticketCount,
                    tickets: building.tickets // Adiciona os tickets ao prédio
                }));
                setBuildings(formattedData);
            } catch (error) {
                console.error('Error fetching buildings:', error);
            }
        };

        fetchBuildings();
    }, [showOnlyWithTickets, showOnlyWithOpenTickets]);

    const toggleShowOnlyWithTickets = () => {
        setShowOnlyWithTickets(!showOnlyWithTickets);
    };

    const toggleShowOnlyWithOpenTickets = () => {
        setShowOnlyWithOpenTickets(!showOnlyWithOpenTickets);
    };

    const handleBuildingClick = (building: Building) => {
        setSelectedBuilding(building);
    };

    const closeModal = () => {
        setSelectedBuilding(null);
    };

    return (
        <div className="sidebar" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <button className="close-btn" onClick={onClose}>
                ✖
            </button>
            <h2>Prédios</h2>
            <div className="filter-controls">
                <label>
                    Mostrar apenas com tickets:
                    <input
                        type="checkbox"
                        checked={showOnlyWithTickets}
                        onChange={toggleShowOnlyWithTickets}
                    />
                </label>
            </div>
            <div className="filter-controls">
                <label>
                    Mostrar apenas com tickets em aberto:
                    <input
                        type="checkbox"
                        checked={showOnlyWithOpenTickets}
                        onChange={toggleShowOnlyWithOpenTickets}
                    />
                </label>
            </div>
            <ul>
                {buildings.map((building) => (
                    <li key={building.buildingId} className="building-item">
                        <button
                            className="building-button"
                            onClick={() => handleBuildingClick(building)}
                        >
                            {building.buildingId} - {building.name}
                        </button>
                        <span className="ticket-count">{building.ticketCount}</span>
                    </li>
                ))}
            </ul>

            {/* Renderiza a modal apenas se houver um prédio selecionado */}
            <BuildingModal building={selectedBuilding} onClose={closeModal} />
        </div>
    );
};

export default Sidebar;
