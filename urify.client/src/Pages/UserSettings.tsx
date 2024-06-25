import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link do react-router-dom
import '../css/UserSettings.css';
import { AuthorizeView } from '../Components/AuthorizeView.tsx';
import ChangePassword from '../Components/ChangePassword'; // Importe o componente de alteração de senha
import '../css/UserSettings.css'

const UserSettings: React.FC = () => {
    return (

        <AuthorizeView>
                <header className="user-settings-header">
                <h2 >Configurações</h2>
                    <Link to="/" className="home-button">Voltar Home</Link>
                </header>
            <ChangePassword />
        </AuthorizeView>
    );
};

export default UserSettings;
