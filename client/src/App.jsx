import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'; // Correct imports
import 'leaflet/dist/leaflet.css';
import './App.css';

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

function App() {

  const [center, setCenter] = useState({ lat: 20.2961, lng: 85.8245 });
  const ZOOM_LEVEL = 9;

  return (
    <>
      <Header title="Parking Lot" />
      <div className="row">
        <div className="col text-center">
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '1000px', width: '1200px' }}  >
              <TileLayer
                url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=PRr9Op4zYedkKCEtxV3T'}
                attribution={'&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
