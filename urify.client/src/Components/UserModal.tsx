import React from 'react';
import '../UserModal.css'
import LogoutLink from './LogoutLink';
import { AuthorizedUser } from "./AuthorizeView";

const UserModal: React.FC = () => {
    return (
        <div className="user-modal">
            <ul>
                <li>Configuração</li>
                <li>
                    <LogoutLink>
                        Logout <AuthorizedUser value="email" />
                    </LogoutLink>
                </li>
            </ul>
        </div>
    );
};

export default UserModal;
