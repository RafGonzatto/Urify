import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import '../css/Map.css'; // Estilo para o componente Map
import TicketModal from './TicketModal';

const Map: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBuildingId, setSelectedBuildingId] = useState('');
    const mapRef = useRef(null);

    const openModal = (buildingId) => {
        setSelectedBuildingId(buildingId);
        setIsModalOpen(true);
    };
     
    const handleBuildingClick = (event) => { 

        const buildingClass = event.currentTarget.className;
        const buildingId = buildingClass.split(' ').find(cls => cls.startsWith('predio-')).split('-')[1];
        openModal(buildingId === '11' ? null : buildingId);
        openModal(buildingId);
    };

    useEffect(() => {
        const buildings = mapRef.current.querySelectorAll('.predio');
        buildings.forEach(building => {
            building.addEventListener('click', handleBuildingClick);
        });

        return () => {
            buildings.forEach(building => {
                building.removeEventListener('click', handleBuildingClick);
            });
        };
    }, [mapRef]);

    return (
        <div className="map-container">
            <Draggable>
                <div className="map-image-wrapper" ref={mapRef}>
                    <img src="/images/31.png" className="predio-31 predio" />
                    <img src="/images/29.png" className="predio-29 predio" />
                    <img src="/images/28.png" className="predio-28 predio" />
                    <img src="/images/27.png" className="predio-27 predio" />
                    <img src="/images/26.png" className="predio-26 predio" />
                    <img src="/images/23.png" className="predio-23 predio" />
                    <img src="/images/21.png" className="predio-21 predio" />
                    <img src="/images/20.png" className="predio-20 predio" />
                    <img src="/images/18.png" className="predio-18 predio" />
                    <img src="/images/17.png" className="predio-17 predio" />
                    <img src="/images/16.png" className="predio-16 predio" />
                    <img src="/images/14.png" className="predio-14 predio" />
                    <img src="/images/13.png" className="predio-13 predio" />
                    <img src="/images/11-12-22-15-24.png" className="predio-11 predio" />
                    <img src="/images/10.png" className="predio-10 predio" />
                    <img src="/images/9.png" className="predio-9 predio" />
                    <img src="/images/8.png" className="predio-8 predio" />
                    <img src="/images/7.png" className="predio-7 predio" />
                    <img src="/images/6.png" className="predio-6 predio" />
                    <img src="/images/5.png" className="predio-5 predio" />
                    <img src="/images/4.png" className="predio-4 predio" />
                    <img src="/images/3.png" className="predio-3 predio" />
                    <img src="/images/2.png" className="predio-2 predio" />
                    <img src="/images/1.png" className="predio-1 predio" />
                    <img src="/images/uri-map.png" alt="Large Map" className="map-image" />
                </div>
            </Draggable>
            <TicketModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                buildingId={selectedBuildingId}
            />
        </div>
    );
};

export default Map;
