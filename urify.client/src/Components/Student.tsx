import React from 'react';
import Sidebar from './Sidebar';
import UserModal from './UserModal';

interface StudentProps {
    toggleSidebar: () => void;
    toggleUserModal: () => void;
    isSidebarOpen: boolean;
    isUserModalOpen: boolean;
}

const Student: React.FC<StudentProps> = ({ toggleSidebar, toggleUserModal, isSidebarOpen, isUserModalOpen }) => (
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

export default Student;
