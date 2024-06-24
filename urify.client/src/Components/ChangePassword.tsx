import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/ChangePassword.css';

const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Simulação de lógica para alterar a senha
        //if (newPassword === confirmPassword) {
        //    fetch(`/change-password`, {
                
        //    }
        //} else {
        //    alert('As senhas não coincidem. Por favor, tente novamente.');
        //}
    };

    return (
        <div className="change-password">
            <h2>Alterar Senha</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="currentPassword">Senha Atual:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">Nova Senha:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Alterar Senha</button>
            </form>
        </div>
    );
};

export default ChangePassword;
