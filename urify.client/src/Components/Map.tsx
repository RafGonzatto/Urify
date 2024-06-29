import React from 'react';
import Draggable from 'react-draggable';
import '../css/Map.css'; // Estilo para o componente Map

const Map: React.FC = () => {
    return (
        <div className="map-container">
            <Draggable>
                <div className="map-image-wrapper">
                    <img src="/images/uri-map.png" alt="Large Map" className="map-image" />
                </div>
            </Draggable>
        </div>
    );
};

export default Map;
