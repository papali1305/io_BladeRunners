import Booking from "./Booking"
import Slots from "./componenets/slots"
import Button from 'react-bootstrap/Button'

import 'leaflet/dist/leaflet.css';
import './App.css';
import Map from "./Components/MapPage"
function App() {

  return (
    <>
      {/* <Booking/> */}
      <Slots/>
      <Button>Text Button</Button>
      <Map/>
    </>
  )
}

export default App
