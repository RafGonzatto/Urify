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
        borderRadius: '8px',  // Rounded corners
        backgroundColor: '#fff',  // Background color
        textAlign: 'left',  // Text alignment
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',  // Box shadow
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Overlay color
    },
};

// Estilos CSS personalizados para os inputs e textarea
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

const TicketModal = ({ isOpen, onRequestClose }) => {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const email = localStorage.getItem("email");

    useEffect(() => {
        // Fetch buildings from the database
        fetchBuildings();
    }, []);

    const fetchBuildings = () => {
        fetch('https://localhost:7249/building/all-buildings')
            .then(response => response.json())
            .then(data => setBuildings(data))
            .catch(error => console.error('Error fetching buildings:', error));
    };

    const handleChangeDescription = (e) => {
        // Limit description to 200 characters
        const text = e.target.value.slice(0, 100);
        setDescription(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('buildingId', selectedBuilding);
        formData.append('description', description);
        formData.append('image', image);  // 'image' deve ser um Blob ou File
        formData.append('email', email); 
        

        fetch('https://localhost:7249/Ticket/create-ticket', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                alert('Ticket created successfully');
                onRequestClose();
                // Atualiza a lista de pr�dios ap�s criar o ticket, se necess�rio
                fetchBuildings();
            } else {
                alert('Failed to create ticket');
            }
        }).catch(error => {
            console.error('Error creating ticket:', error);
            alert('Failed to create ticket');
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Create Ticket"
        >
            <div className="register-ticket-container">
                <h2>Criar Ticket</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="combobox">Pr�dio:</label>
                        <select
                            id="combobox"
                            value={selectedBuilding}
                            onChange={(e) => setSelectedBuilding(e.target.value)}
                            style={inputStyles} // Aplicando os estilos
                        >
                            <option value="">Selecione o pr�dio</option>
                            {buildings.map((building) => (
                                <option key={building.buildingId} value={building.buildingId}>
                                    {building.buildingId} - {building.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descri��o:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleChangeDescription}
                            rows={4}  // Adjust textarea height
                            maxLength={100}  // Limit to 200 characters
                            style={{ ...inputStyles, resize: 'vertical' }} // Aplicando os estilos
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Anexar imagem:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={inputStyles} // Aplicando os estilos
                        />
                    </div>
                    <div>
                        <button className="register-ticket-button" type="submit">Criar Ticket</button>
                        <button className="close-ticket-button" type="button" onClick={onRequestClose}>Fechar</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default TicketModal;
