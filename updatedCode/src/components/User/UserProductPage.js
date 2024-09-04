import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../slices/productSlice";
import { getProducts } from "../../api/productAPI";
import { addToCart } from "../../slices/cartSlice";
import { Card, Button } from "react-bootstrap";
import Notification from "../Layout/Notification";
import "./UserProductPage.css";

const UserProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredItems);
  // const token = useSelector(state=>{state.auth.token})
// const [message, setMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const productsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        dispatch(setProducts(productsArray));
      } catch (error) {
        console.log( error);
        setNotificationMessage(
          "Failed to fetch products."
        );
        setShowNotification(true);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setNotificationMessage("Added to Cart");
    setShowNotification(true);

    // console.log(product)
    // if(!token){
    //   navigate('/user-login')
    // }
    // return null;
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="user-product-page">
       <Notification
        message={notificationMessage}
        show={showNotification}
        onClose={handleCloseNotification}
      />
      <div className="user-product-grid">
        {products.map((product) => (
          <div key={product.id} className="user-product-item">
            <Card.Body className="user-product-card">
              <Card.Title className="user-product-card-title">
                {product.name}
              </Card.Title>
              <Card.Img
                variant="top"
                src={product.image}
                className="user-product-card-img"
              />
              <Card.Subtitle className="user-product-card-subtitle">
                Price: ${product.price}
              </Card.Subtitle>
              <Card.Text className="user-product-card-text">
                Category: {product.category}
              </Card.Text>

              <Button
                variant="primary"
                className="user-product-button"
                onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </Card.Body>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProductPage;
