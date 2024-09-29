import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

const Booking = ({ show, setShow, handleBooking }) => {
  const [formData, setFormData] = useState({
    email: '',
    carNumber: '',
    carColour: '',
    date: '',
    startTime: ''
  });
  
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', formData);
    
    // Input validation
    if (!formData.carNumber.match(/^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{1,4}$/)) {
      alert('Invalid car number format. Please use the format: XX 12 XX 1234');
      return;
    }

    setShowOtp(true);
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setShowOtp(false);
      setShowPaymentModal(true);
    } else {
      alert('Invalid OTP. Please enter a 6-digit OTP.');
    }
  };

  const handlePayment = (paymentMethod) => {
    console.log(`Payment method: ${paymentMethod}`);
    setShowPaymentModal(false);
    setBookingConfirmed(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 4000);
    setTimeout(() => {
      setBookingConfirmed(false);
      setShow(false);
      navigate('/slots');
      handleBooking(formData.startTime, formData.startTime);
    }, 6000);
  };

  return (
    <>
      {/* Main Booking Modal */}
      <Modal show={show && !bookingConfirmed && !showPaymentModal} onHide={handleClose} centered>
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
                placeholder="Enter car number (e.g. XX 12 XX 1234)"
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

            <Button variant="primary" type="submit" className="w-100">
              Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* OTP Modal */}
      {showOtp && (
        <Modal show={showOtp} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formOtp">
                <Form.Label>OTP</Form.Label>
                <Form.Control
 type="number"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="button" onClick={handleOtpSubmit} className="w-100">
                OK
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <Modal show={showPaymentModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Payment Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Select a payment method:</h5>
            <ul>
              <li>
                <Button variant="primary" onClick={() => handlePayment('PhonePe')}>
                  PhonePe
                </Button>
              </li>
              <li>
                <Button variant="primary" onClick={() => handlePayment('GooglePay')}>
                  Google Pay
                </Button>
              </li>
              <li>
                <Button variant="primary" onClick={() => handlePayment('Paytm')}>
                  Paytm
                </Button>
              </li>
              <li>
                <Button variant="primary" onClick={() => handlePayment('Cash')}>
                  Cash
                </Button>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
      )}

      {/* Booking Animation Modal */}
      {bookingConfirmed && (
        <Modal show={bookingConfirmed} centered>
          <Modal.Body>
            <div className="text-center booking-animation">
              <div className="car-parking-animation">
                <div className="road"></div>
                <div className="parking-lot">
                  <div className="parking-spot"></div>
                  <div className="car"></div>
                </div>
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