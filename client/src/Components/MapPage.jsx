import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconImage from '../assets/images.png'; // Import the marker icon image
import data from '../innovateOdisha.lots.json'; // Sample data import
//import Slot from './Slots'; // Assuming Slots is the component for individual slots
import customIcon from './CustomMarker';
import Slot from "./Slots"
import { useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useMapEvent } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';
import { Rectangle } from 'react-leaflet';
import Routing from './Routing';
import useGeoLocation from './useGeoLoacation';


const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap()

 
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)

 
  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
   
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])


  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
  useEventHandlers({ instance: parentMap }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap()
  const mapZoom = zoom || 8

  
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: '100px', width: '100px' }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 20.2961, lng: 85.8245 });
  const [page, setPage] = useState('/');
  const ZOOM_LEVEL = 10;
  const location=useGeoLocation();
  const mapRef = useRef();


  const showMyLocation = () => {
    if (location.loaded && !location.error) {
     
      mapRef.current.setView(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };
  

  


  const markerIcon = new L.Icon({
    iconUrl: markerIconImage,
    iconSize: [12, 25],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46]
  });


  const switchPage = () => {
    switch (page) {
      case 'slots':
        return <Slot />;
      default:
        return null;
    }
  };

  // Simulating data fetch

  useEffect(() => {
    console.log(data);
  }, []);
  // const startCoordinates = { lat:  20.2384327,lng:  85.751375 }; // Example: Bhubaneswar
  // const endCoordinates = { lat: 20.3957652 , lng:  85.7847646 }; // Example: another point in Bhubaneswar

  return (
    <>
      <Header title="Parking Lot" />
      <div className="map-container">
        <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '80vh', width: '80vw' }} scrollWheelZoom={false}  whenCreated={mapInstance => { mapRef.current = mapInstance; }} >
          <TileLayer
            url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=PRr9Op4zYedkKCEtxV3T'}
            attribution={'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
          />
          {location.loaded&& !location.error&&(
          <Marker
          icon={markerIcon}
          position={[
            location.coordinates.lat,
            location.coordinates.lng,
          ]}
        >

            </Marker>
          )}
          {data.map((lot) => (
            <Marker
              key={lot._id.$oid}
              position={[lot.location.coordinates[0], lot.location.coordinates[1]]}
              icon={customIcon}
            >
              <MinimapControl position="topright" />
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
          
          {/* <Routing start={startCoordinates} end={endCoordinates} /> */}
        </MapContainer>

        {/* Conditionally render the slot component */}
        {switchPage()}
      </div>

      <div>
      <button className="btn btn-primary" onClick={showMyLocation}>
            Locate Me 
          </button>
      </div>
    </>
  );
};

export default MapPage;
