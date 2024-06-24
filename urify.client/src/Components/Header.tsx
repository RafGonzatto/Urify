import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UserModal from './UserModal';
import { Navigate } from 'react-router-dom';
import '../css/App.css';

interface HeaderProps {
    userType: number;
    status: number;
}

const Header: React.FC<HeaderProps> = ({ userType, status }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserModal = () => setIsUserModalOpen(!isUserModalOpen);

    if (!status) {
        return <Navigate to="/login" />;
    }
    let content = "";
    switch (userType) {
        case 0:
            content = <Student toggleSidebar={toggleSidebar} toggleUserModal={toggleUserModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} />;
            break;
        case 1:
            content = <Worker toggleSidebar={toggleSidebar} toggleUserModal={toggleUserModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} />;
            break;
        case 2:
            content = <Admin toggleSidebar={toggleSidebar} toggleUserModal={toggleUserModal} isSidebarOpen={isSidebarOpen} isUserModalOpen={isUserModalOpen} />;
            break;
        default:
            break;
    }

    return (
        <div className="app">
            {content}
        </div>
    );
};

const Student: React.FC<{ toggleSidebar: () => void; toggleUserModal: () => void; isSidebarOpen: boolean; isUserModalOpen: boolean; }> = ({ toggleSidebar, toggleUserModal, isSidebarOpen, isUserModalOpen }) => (
    <>
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
            <p>Restante não implementado do site para Estudante</p>
        </main>
    </>
);

const Worker: React.FC<{ toggleSidebar: () => void; toggleUserModal: () => void; isSidebarOpen: boolean; isUserModalOpen: boolean; }> = ({ toggleSidebar, toggleUserModal, isSidebarOpen, isUserModalOpen }) => (
    <>
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
            <p>Restante não implementado do site para Trabalhador</p>
        </main>
    </>
);

const Admin: React.FC<{ toggleSidebar: () => void; toggleUserModal: () => void; isSidebarOpen: boolean; isUserModalOpen: boolean; }> = ({ toggleSidebar, toggleUserModal, isSidebarOpen, isUserModalOpen }) => (
    <>
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
            <p>Restante não implementado do site para Admin</p>
        </main>
    </>
);

export default Header;
