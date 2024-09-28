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
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;

  return (
    <>
      <Header title="parking lot" />
      <div className="row">
        <div className="col text-center">
          <div className="col">
            {/* Replacing Map with MapContainer */}
            <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '500px', width: '100%' }}>
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

export default App;