import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../Components/AuthorizeView.tsx';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px', 
        backgroundColor: '#fff',  
        textAlign: 'left',  
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',  
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    },
};

const inputStyles = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '14px',
    marginBottom: '10px',
};

Modal.setAppElement('#root');

const TicketModal = ({ isOpen, onRequestClose, buildingId }) => {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(buildingId || '');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const email = localStorage.getItem("email");

    useEffect(() => {
        fetchBuildings();
    }, []);

    useEffect(() => {
        setSelectedBuilding(buildingId);
    }, [buildingId]);

    const fetchBuildings = () => {
        fetch('https://localhost:7249/building/all-buildings')
            .then(response => response.json())
            .then(data => setBuildings(data))
            .catch(error => console.error('Error fetching buildings:', error));
    };

    const handleChangeDescription = (e) => {
        const text = e.target.value.slice(0, 100);
        setDescription(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('buildingId', selectedBuilding);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('email', email);

        fetch('https://localhost:7249/Ticket/create-ticket', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                alert('Ticket criado com sucesso');
                onRequestClose();
                fetchBuildings();
            } else {
                alert('Falha ao criar ticket');
            }
        }).catch(error => {
            console.error('Erro ao criar ticket:', error);
            alert('Falha ao criar ticket');
        });
    };
    const selectPromptText = 'Selecione o pr' + String.fromCharCode(233) + 'dio';
    const selectPromptText2 = 'Descri' + String.fromCharCode(231) + '' + String.fromCharCode(227) + 'o:';

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Criar Ticket"
        >
            <div className="register-ticket-container">
                <h2>Criar Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="combobox">{'Pr' + String.fromCharCode(233) + 'dio'}:</label>
                        <select
                            id="combobox"
                            value={selectedBuilding}
                            onChange={(e) => setSelectedBuilding(e.target.value)}
                            style={inputStyles}
                        >
                            <option value="">{selectPromptText}</option>
                            {buildings.map((building) => (
                                <option key={building.buildingId} value={building.buildingId}>
                                    {building.buildingId} - {building.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">{selectPromptText2}</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleChangeDescription}
                            rows={4}
                            maxLength={100}
                            style={{ ...inputStyles, resize: 'vertical' }}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Anexar imagem:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={inputStyles}
                        />
                    </div>
                    <div>
                        <button className="register-ticket-button" type="submit">{'Criar Ticket'}</button>
                        <button className="close-ticket-button" type="button" onClick={onRequestClose}>{'Fechar'}</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default TicketModal;
