import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';

interface Building {
    buildingId: number;
    name: string;
    tickets: number | null;
}

interface SidebarProps {
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
    const [buildings, setBuildings] = useState<Building[]>([]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await fetch('https://localhost:7249/building/all-buldings');
                if (!response.ok) {
                    throw new Error('Failed to fetch buildings');
                }
                const data = await response.json();
                const formattedData = data.map((building: Building) => ({
                    buildingId: building.buildingId,
                    name: building.name,
                    tickets: building.tickets !== null ? building.tickets : 0,
                }));
                setBuildings(formattedData);
            } catch (error) {
                console.error('Error fetching buildings:', error);
            }
        };

        fetchBuildings();
    }, []);

    return (
        <div className="sidebar" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <button className="close-btn" onClick={onClose}>
                ✖
            </button>
            <h2>Prédios</h2>
            <ul>
                {buildings.map((building) => (
                    <li key={building.buildingId} className="building-item">
                        <span className="building-name">{building.buildingId}-{building.name}</span>
                        <span className="ticket-count">{building.tickets}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
