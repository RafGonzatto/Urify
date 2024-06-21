import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UserModal from './UserModal';
import '../App.css';

const Page: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserModal = () => setIsUserModalOpen(!isUserModalOpen);

    return (
        <div className="app">
            <header className="header">
                <button className="menu-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <div className="search-bar-container">
                    <input type="text" className="search-bar" placeholder="Search..." />
                    <span className="search-icon">🔍</span>
                </div>
                <button className="user-icon" onClick={toggleUserModal}>
                    👤
                </button>
            </header>
            {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
            {isUserModalOpen && <UserModal />}
            <main className="content">
                <p>restante não implementado do site</p>
            </main>
        </div>
    );
};

export default Page;