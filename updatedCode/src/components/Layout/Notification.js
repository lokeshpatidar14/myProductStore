import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Notification = ({ message, show, onClose }) => {
  return (
    <ToastContainer>
      <Toast show={show} onClose={onClose} delay={1000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
