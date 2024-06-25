import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

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
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Fetch options from the database
        fetch('/api/options') // Adjust the endpoint to your needs
            .then(response => response.json())
            .then(data => setOptions(data));
    }, []);

    const handleChangeDescription = (e) => {
        // Limit description to 200 characters
        const text = e.target.value.slice(0, 100);
        setDescription(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('option', selectedOption);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        fetch('/api/tickets', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                alert('Ticket created successfully');
                onRequestClose();
            } else {
                alert('Failed to create ticket');
            }
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
                        <label htmlFor="combobox">Prédio:</label>
                        <select
                            id="combobox"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            style={inputStyles} // Aplicando os estilos
                        >
                            <option value="">Select an option</option>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleChangeDescription}
                            rows={4}  // Adjust textarea height
                            maxLength={200}  // Limit to 200 characters
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
