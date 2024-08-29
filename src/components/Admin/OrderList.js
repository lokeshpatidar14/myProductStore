// src/components/Admin/OrderList.js

import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../../api/orderAPI";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        // Ensure data is always an array
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrder(id, { status });
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      setError("Failed to update order status.");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>{order.productName}</p>
              <p>Status: {order.status}</p>
              <button
                onClick={() => handleStatusChange(order.id, "Processing")}>
                Processing
              </button>
              <button onClick={() => handleStatusChange(order.id, "Shipped")}>
                Shipped
              </button>
              <button onClick={() => handleStatusChange(order.id, "Delivered")}>
                Delivered
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
