import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Booking from "./Booking";
import Slots from "./Components/Slots";
import 'leaflet/dist/leaflet.css';
import './App.css';
import MapPage from "./Components/MapPage";
import Registration from './Registration';
import NavigationBar from './Components/NavigationBar';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          {/* Registration page as the first page */}
          <Route path="/" element={<Registration />} />
          {/* After registration, the map page */}
          <Route path="/map" element={<MapPage />} />
          {/* After clicking a pin and showing slots */}
          <Route path="/slots" element={<Slots />} />
          {/* After selecting a slot, the booking page */}
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
