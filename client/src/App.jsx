import Booking from "./Booking"
import Slots from "./components/Slots"
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';
import './App.css';
import Map from "./Components/MapPage"
import Registration from './Registration';
function App() {

  return (
    <>
      {/* <Booking/> */}
      <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
      <Slots/>
      <Button>Text Button</Button>
      <Map/>
    </>
  )
}

export default App
