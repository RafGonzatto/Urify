import React from 'react';
import { Link } from 'react-router-dom'; // Importação do Link
import '../css/UserModal.css';
import LogoutLink from './LogoutLink';

interface UserModalProps {
    toggleUserModal: () => void;
}

const unicodeString = 'Configura' + String.fromCharCode(0x00E7) + String.fromCharCode(0x00E3) + 'o';

const UserModal: React.FC<UserModalProps> = ({ toggleUserModal }) => { // Desestruturação das props
    return (
        <div className="user-modal">
            <ul>
                <li>
                    <Link to="/settings" onClick={toggleUserModal}>{unicodeString}</Link>
                </li>
                <li>
                    <LogoutLink>
                        Logout
                    </LogoutLink>
                </li>
            </ul>
        </div>
    );
};

export default UserModal;
