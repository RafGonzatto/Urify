import React from 'react';
import '../Sidebar.css';

interface SidebarProps {
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
    return (
        <div className="sidebar">
            <button className="close-btn" onClick={onClose}>
                ✖
            </button>
            <h2>Recursos do Site</h2>
            <ul>
                <li>Recurso 1</li>
                <li>Recurso 2</li>
                <li>Recurso 3</li>
            </ul>
        </div>
    );
};

export default Sidebar;
