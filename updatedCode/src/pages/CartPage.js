import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../slices/cartSlice";
import { fetchCartItems } from "../api/cartAPI";
import { Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cart from "../components/User/Cart";
import styles from "./CartPage.module.css";
import { SlBasket } from "react-icons/sl";
import CheckoutPage from "./CheckoutPage";

const CartPage = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems();
        dispatch(setCartItems(items || []));
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    loadCartItems();
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalCartLength = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.cartPageHeader}>
        <SlBasket size={30} color="black" className={styles.cartPageIcon} />
        <Badge bg="secondary">{totalCartLength}</Badge>
      </div>
      <Cart />
      <span className={styles.cartPageTotal}>
        Total: ${totalPrice.toFixed(2)}
      </span>
      <Button
        variant="primary"
        onClick={handleCheckout}
        className={styles.checkoutButton}>
        Checkout
      </Button>
      <CheckoutPage show={showModal} onClose={handleClose} />
    </div>
  );
};

export default CartPage;
