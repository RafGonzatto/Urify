import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


interface User {
    id: string;
    userName: string;
}

interface ApproveModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const ApproveModal: React.FC<ApproveModalProps> = ({ isOpen, onRequestClose }) => {
    const [usersToApprove, setUsersToApprove] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsersToApprove = async () => {
            try {
                const response = await fetch('https://localhost:7249/UserApproval/approve');
                if (!response.ok) {
                    throw new Error('Failed to fetch users to approve');
                }
                const data = await response.json();
                setUsersToApprove(data);
            } catch (error) {
                console.error('Error fetching users to approve:', error);
            }
        };

        if (isOpen) {
            fetchUsersToApprove();
        }
    }, [isOpen]);

    const handleApproveUser = async (user: User) => {
        try {
            const response = await fetch(`https://localhost:7249/UserApproval/approve/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    approved: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve user');
            }

            // Atualizar lista de usuários após aprovação
            const updatedUsers = usersToApprove.filter((u) => u.id !== user.id);
            setUsersToApprove(updatedUsers);
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
            <div className="modal-content">
                <span className="close-modal" onClick={onRequestClose}>
                    ✖
                </span>
                <h2>Usuários para Aprovação</h2>
                <ul>
                    {usersToApprove.map((user) => (
                        <li key={user.id}>
                            {user.userName}
                            <button onClick={() => handleApproveUser(user)}>Aprovar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default ApproveModal;
