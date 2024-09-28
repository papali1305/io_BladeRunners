// src/Component/MapComponent.jsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import customIcon from './CustomMarker'; // Import the custom icon

function MapComponent() {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 13;

  // Popup content: Detailed parking information
  const popupContent = `
    <div>
      <h3>Parking Lot Details</h3>
      <p>15 parking seats available</p>
      <p>15 seats booked</p>
      <p>Location: 123 Main Street, Chennai</p>
    </div>
  `;

  // Tooltip content: Parking status (shown on hover)
  const tooltipContent = '15 seats available | 15 seats booked';

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=PRr9Op4zYedkKCEtxV3T'}
        attribution={'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
      />
      {/* Marker with hover and click events */}
      <Marker position={center} icon={customIcon}>
        {/* Tooltip for hover effect */}
        <Tooltip>{tooltipContent}</Tooltip>
        {/* Popup for additional information on click */}
        <Popup>
          <div dangerouslySetInnerHTML={{ __html: popupContent }} />
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
