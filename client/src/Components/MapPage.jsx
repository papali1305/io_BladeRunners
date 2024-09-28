import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconImage from '../assets/images.png'; // Import the marker icon image
import data from '../innovateOdisha.lots.json'; // Sample data import
import Slot from './Slots'; // Assuming Slots is the component for individual slots
import customIcon from './CustomMarker';

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 20.2961, lng: 85.8245 });
  const [page, setPage] = useState('/'); // Initialize inside component
  const ZOOM_LEVEL = 9;
  
  // Marker icon settings
  const markerIcon = new L.Icon({
    iconUrl: markerIconImage,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46]
  });

  // Function to switch between components based on the page
  const switchPage = () => {
    switch (page) {
      case 'slots':
        return <Slot />;
      default:
        return null; // If no matching route, return nothing
    }
  };

  // Simulating data fetch
  useEffect(() => {
    console.log(data);
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
              icon={customIcon}
            >
              <Tooltip>
              <b>{lot.lotName}</b><br />
                Capacity: {lot.capacity}<br />
                Available Spaces: {lot.availableSpaces}<br />
                Hourly Rate: ₹{lot.hourlyRate}
              </Tooltip>
              <Popup>
                <b>{lot.lotName}</b><br />
                Capacity: {lot.capacity}<br />
                Available Spaces: {lot.availableSpaces}<br />
                Hourly Rate: ₹{lot.hourlyRate}
                <br />
                <button onClick={() => setPage('slots')}>Show Slot</button> {/* Use a function to update the page */}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Conditionally render the slot component */}
        {switchPage()}
      </div>
    </>
  );
};

export default MapPage;
