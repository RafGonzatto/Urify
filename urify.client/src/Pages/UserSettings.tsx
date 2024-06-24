import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link do react-router-dom
import '../css/UserSettings.css';
import { AuthorizeView } from '../Components/AuthorizeView.tsx';
import ChangePassword from '../Components/ChangePassword'; // Importe o componente de alteração de senha

const UserSettings: React.FC = () => {
    return (

        <AuthorizeView>
        <div className="user-settings">
            <h2>Configurações do Usuário</h2>
            <ChangePassword />
            {/* Botão para voltar para a home */}
            <Link to="/">Voltar para Home</Link>
            </div>
        </AuthorizeView>
    );
};

export default UserSettings;
