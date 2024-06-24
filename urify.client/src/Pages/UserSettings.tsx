import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link do react-router-dom
import '../css/UserSettings.css';
import ChangePassword from '../Components/ChangePassword'; // Importe o componente de altera��o de senha

const UserSettings: React.FC = () => {
    return (
        <div className="user-settings">
            <h2>Configura��es do Usu�rio</h2>
            <ChangePassword />
            {/* Bot�o para voltar para a home */}
            <Link to="/">Voltar para Home</Link>
        </div>
    );
};

export default UserSettings;
