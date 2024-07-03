import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/AuthorizeView.tsx';
import '../css/ChangePassword.css';

const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        try {
            const response = await fetch('https://localhost:7249/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    email: user.email,
                })
            });

            if (response.ok) {
                alert('Senha alterada com sucesso!');
                navigate('/');
            } else {
                const error = await response.json();
                alert(`Erro: ${error.message}`);
            }
        } catch (error) {
            alert('Ocorreu um erro ao tentar alterar a senha. Por favor, tente novamente.');
        }
    };

    return (
        <div className="change-password">
            <h2>Alterar Senha</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Senha antiga</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Nova senha</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar nova senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <p className="password-info">Tenha certeza de que sua senha contenha um caractere mai{String.fromCharCode(250)}sculo, um caractere min{String.fromCharCode(250)}sculo, um d{String.fromCharCode(237)}gito e um caractere n{String.fromCharCode(227)}o alfanum{String.fromCharCode(233)}rico.</p>
                <button type="submit" className="update-password-button">Atualizar senha</button>
            </form>
        </div>
    );
};

export default ChangePassword;
