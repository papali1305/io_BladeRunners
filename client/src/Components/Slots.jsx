import React, { useState, useEffect } from "react";
import Booking from "../Booking"; // Updated path to reflect the correct location
import { useNavigate} from 'react-router-dom';

const Slots = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showBooking, setShowBooking] = useState(false); // State to show booking modal
  const [timer, setTimer] = useState(null); // State to store timer
  const [bookedSlots, setBookedSlots] = useState([]); // State to store booked slots
  const [showEndParking, setShowEndParking] = useState(false); // State to show end parking popup
  const [endedParking, setEndedParking] = useState([]); // State to store ended parking slots
  const [fees, setFees] = useState({}); // State to store fees for each slot
  const [occupiedSlots, setOccupiedSlots] = useState([]); // State to store occupied slots
  const [slotTimers, setSlotTimers] = useState({}); // State to store timers for each slot
  const [countdown, setCountdown] = useState(null); // State to store countdown timer

  const navigate = useNavigate();

  const handleBoxClick = (index) => {
    if (!bookedSlots.includes(index) && !occupiedSlots.includes(index)) {
      setClickedIndex(index);
      setShowBooking(true); // Show the booking modal
    }
  };

  const containerStyle = {
    height: '100vh', 
    width: '100%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 120px)',
    gridTemplateRows: 'repeat(3, 1fr)',    
    gap: '20px', 
    width: '100%',
    height: '100%',
  };

  const boxStyle = {
    backgroundColor: 'transparent', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black', 
    fontSize: '1.2rem', 
    borderRadius: '8px', 
    height: '150px', 
    fontWeight: 'bold',
  };
  
  const getBorderColor = (borderStyle) => {
    const match = borderStyle.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/); 
    return match ? match[0] : '#fff'; 
  };

  const positions = [
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
    { border: '4px solid #1ed14b' }, // Green border
  ];

  useEffect(() => {
    if (timer) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleBooking = (startTime, endTime) => {
    const duration = (new Date(endTime) - new Date(startTime)) / 1000;
    setTimer(duration);
    setBookedSlots([...bookedSlots, clickedIndex]);
    setOccupiedSlots([...occupiedSlots, clickedIndex]);
    setSlotTimers({ ...slotTimers, [clickedIndex]: duration });
    setCountdown(duration);
 };

  const handleEndParking = (index) => {
    const fee = calculateFee(index);
    setFees({ ...fees, [index]: fee });
    setEndedParking([...endedParking, index]);
    setOccupiedSlots(occupiedSlots.filter(slot => slot !== index));
    setShowEndParking(false);
    clearInterval(intervalId);
    window.location.reload(); // Refresh the page
  };

  const calculateFee = (index) => {
    // Calculate the fee based on the duration and other factors
    // For demonstration purposes, let's assume the fee is $10 return 10;
  };

  let intervalId;

  useEffect(() => {
    if (slotTimers[clickedIndex]) {
      intervalId = setInterval(() => {
        setSlotTimers({ ...slotTimers, [clickedIndex]: slotTimers[clickedIndex] - 1 });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [slotTimers, clickedIndex]);

  useEffect(() => {
    if (countdown) {
      const intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [countdown]);

  return (
    <div style={{ ...containerStyle, backgroundColor:'#dcdcde' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button onClick={() => navigate('/map')}>Back</button>
      </div>
      <div style={gridStyle}>
        {positions.map((style, index) => (
          <div
            key={index}
            style={{
              ...boxStyle,
              ...style,
              backgroundColor: occupiedSlots.includes(index) ? '#f86368' : bookedSlots.includes(index) ? '#f86368' : endedParking.includes(index) ? '#1ed14b' : getBorderColor(style.border) === '#fff' ? '#68de7c' : getBorderColor(style.border),
            }}
            onClick={() => handleBoxClick(index)} // Handle click on box
          >
            {occupiedSlots.includes(index) ? (
              <div>
                Occupied
                <button onClick={() => setShowEndParking(true)}>End Parking ({countdown})</button>
                {showEndParking && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.5)' }}>
                    <h2>End Parking</h2>
                    <p>Are you sure you want to end parking?</p>
                    <button onClick={() => handleEndParking(index)}>Yes</button>
                    <button onClick={() => setShowEndParking(false)}>No</button>
                  </div>
                )}
                {slotTimers[index] && (
                  <div>
                    Time remaining: {slotTimers[index]} seconds
                  </div>
                )}
              </div>
            ) : 'Box ' + (index + 1)}
          </div>
        ))}
      </div>

      {/* Show Booking Modal when a box is clicked */}
      {showBooking && <Booking show={showBooking} setShow={setShowBooking} handleBooking={handleBooking} />}

      {/* Display timer */}
      {timer && (
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <h2>Time remaining: {timer} seconds</h2>
        </div>
      )}

      {/* Display fee */}
      {Object.keys(fees).length > 0 && (
        <div style={{ position: 'absolute', top: '50px', right: '10px' }}>
          <h2>Fees:</h2>
          <ul>
            {Object.keys(fees).map((index) => (
              <li key={index}>Box {index + 1}: ${fees[index]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Slots;