import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../slices/cartSlice";
import { Button, Form } from "react-bootstrap";
import styles from "./Cart.module.css";
import { SlTrash } from "react-icons/sl";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleQuantityIncrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      handleQuantityChange(id, item.quantity + 1);
    }
  };

  const handleQuantityDecrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      handleQuantityChange(id, item.quantity - 1);
    }
  };

  return (
    <>
      <ul className={styles.cartList}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.name} />
            <div className={styles.cartItemDetails}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <div className={styles.cartItemButtons}>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityDecrement(item.id)}>
                  -
                </Button>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className={styles.cartItemQuantity}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityIncrement(item.id)}>
                  +
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(item.id)}
                  className={styles.removeButton}>
                  <SlTrash />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cart;
