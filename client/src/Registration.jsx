// src/Registration.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Import checkmark icon

const Registration = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false); // To show loading state
  const [registered, setRegistered] = useState(false); // To handle registration success state
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Details:', formData);

    // Start loading animation
    setLoading(true);

    // Simulate a delay before showing success
    setTimeout(() => {
      setLoading(false);
      setRegistered(true); // Show success animation

      // Delay before redirecting to the booking page
      setTimeout(() => {
        navigate('/booking');
      }, 2000); // 2 seconds for success animation
    }, 3000); // 3 seconds of loading time
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!registered ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                placeholder="Enter phone number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </Form.Group>

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

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Registering...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </Form>
        ) : (
          <div className="text-center">
            <FaCheckCircle size={50} color="green" />
            <h4 className="mt-3">Registration Successful!</h4>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Registration;
