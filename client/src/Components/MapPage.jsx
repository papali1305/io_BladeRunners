import React from 'react'
import fileLog from "../innovateOdisha.lots.json";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import Marker and Popup
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIconImage from '../assets/images.png'; // Import the marker icon image
import data from '../innovateOdisha.lots.json';
function Header({ title }) {
    return (
      <header>
        <h1>{title}</h1>
      </header>
    );
  }

  const markerIcon = new L.Icon({
    iconUrl: markerIconImage, // Use the imported image
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46]
  });
  
const MapPage = () => {
    const [center, setCenter] = useState({ lat: 20.2961, lng: 85.8245 });
    const ZOOM_LEVEL = 9;
    const files = fileLog;
  
    useEffect(() => {
      console.log(files);
    }, []);
  
    return (
      <>
        <Header title="Parking Lot" />
        <div className="map-container">
          <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '80vh', width: '80vw' }}>
            <TileLayer
              url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=PRr9Op4zYedkKCEtxV3T'}
              attribution={'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
            />
            {data.map((lot) => (
              <Marker
                key={lot._id.$oid}
                position={[lot.location.coordinates[0], lot.location.coordinates[1]]}
                icon={markerIcon}
              >
                <Popup>
                  <b>{lot.lotName}</b><br />
                  Capacity: {lot.capacity}<br />
                  Available Spaces: {lot.availableSpaces}<br />
                  Hourly Rate: ${lot.hourlyRate}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </>
    )
}

export default MapPage