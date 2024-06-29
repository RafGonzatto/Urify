import React from 'react';
import Sidebar from './Sidebar';
import UserModal from './UserModal';
import Map from './Map'
interface StudentProps {
    toggleSidebar: () => void;
    toggleUserModal: () => void;
    isSidebarOpen: boolean;
    isUserModalOpen: boolean;
}

const Student: React.FC<StudentProps> = ({ toggleSidebar, toggleUserModal, isSidebarOpen, isUserModalOpen }) => (
    <>
        <header className="header">
            <button className="user-icon" onClick={toggleUserModal}>
                👤
            </button>
        </header>
        {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
        {isUserModalOpen && <UserModal />}
        <Map></Map>
    </>
);

export default Student;
