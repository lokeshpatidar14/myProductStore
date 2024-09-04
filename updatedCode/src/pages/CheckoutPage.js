import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { placeOrder } from "../api/orderAPI";
import { setCartItems } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = async () => {
    try {
      const order = {
        userId: localStorage.getItem("userId"),
        items: cartItems,
        totalPrice: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        createdAt: new Date().toISOString(),
        address,
      };

      await placeOrder(order);
      dispatch(setCartItems([]));
      console.log("cart item empty from checkoutpage");
      navigate("/user-orders");
      onClose();
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPayment">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control
              as="select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Credit Card</option>
              <option>COD</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutPage;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Form } from "react-bootstrap";
// import { placeOrder } from "../api/orderAPI";
// import { setCartItems } from "../slices/cartSlice";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state) => state.cart.items);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   const handlePlaceOrder = async () => {
//     try {
//       const order = {
//         userId: localStorage.getItem("userId"),
//         items: cartItems,
//         totalPrice: cartItems.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         ),
//         createdAt: new Date().toISOString(),
//         address,
//       };

//       await placeOrder(order);
//       dispatch(setCartItems([]));
//       console.log("cart item empty from checkoutpage");
//       navigate("/user-orders");
//     } catch (error) {
//       console.error("Failed to place order:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <Form>
//         <Form.Group controlId="formAddress">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formPayment">
//           <Form.Label>Payment Method</Form.Label>
//           <Form.Control
//             as="select"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}>
//             <option>Credit Card</option>
//             <option>COD</option>
//           </Form.Control>
//         </Form.Group>
//         <Button variant="primary" onClick={handlePlaceOrder}>
//           Place Order
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default CheckoutPage;
