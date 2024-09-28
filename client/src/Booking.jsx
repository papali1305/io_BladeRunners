// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    carNumber: '',
    carColour: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State for showing the animation
  const [showMessage, setShowMessage] = useState(false); // State for showing the message
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', formData);
    
    // Simulate a booking process
    setBookingConfirmed(true); // Show animation popup

    // Show message after a delay (e.g., 4 seconds)
    setTimeout(() => {
      setShowMessage(true);
    }, 4000); // 4 seconds for the animation to complete

    // Hide animation and navigate after a longer delay (e.g., 6 seconds)
    setTimeout(() => {
      setBookingConfirmed(false); // Hide the booking animation
      navigate('/'); // Navigate to the homepage or other page
    }, 6000); // 6 seconds for the full animation including message
  };

  return (
    <>
      {/* Main Booking Modal */}
      <Modal show={show && !bookingConfirmed} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book your slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarNumber">
              <Form.Label>Car Number</Form.Label>
              <Form.Control
                type="text"
                name="carNumber"
                placeholder="Enter car number"
                value={formData.carNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarColour">
              <Form.Label>Car Colour</Form.Label>
              <Form.Control
                type="text"
                name="carColour"
                placeholder="Enter car colour"
                value={formData.carColour}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Car Parking Animation Popup */}
      {bookingConfirmed && (
        <Modal show={bookingConfirmed} centered>
          <Modal.Body>
            <div className="text-center booking-animation">
              <div className="car-parking-animation">
                <div className="road"></div>
                <div className="parking-lot">
                  <div className="parking-spot"></div>
                </div>
                <div className="car"></div>
              </div>
              {showMessage && (
                <h4>Your time starts now!</h4>
              )}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Booking;