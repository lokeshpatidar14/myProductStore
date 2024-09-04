import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Spinner, Dropdown, DropdownButton } from "react-bootstrap";
import { getOrdersForUser } from "../../api/orderAPI";
import { setOrders } from "../../slices/orderSlice";
import "./OrderHistory.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersForUser();
        dispatch(setOrders(data));
      } catch (error) {
        console.error("Error fetching orders for user:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [dispatch]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (order) => order.status.toLowerCase() === filter.toLowerCase()
        );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div
      style={{
        background: "linear-gradient(-90deg, #edd8a7, #eeffdd14)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px 100px",
      }}>
      <h2 className="m-1-2">Order History</h2>
      <DropdownButton
        id="dropdown-basic-button"
        title={`Filter: ${filter}`}
        onSelect={handleFilterChange}
        className="mb-4">
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
        <Dropdown.Item eventKey="Placed">Placed</Dropdown.Item>
        <Dropdown.Item eventKey="Processing">Processing</Dropdown.Item>
        <Dropdown.Item eventKey="Shipped">Shipped</Dropdown.Item>
        <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
      </DropdownButton>
      <div className="order-history">
        {filteredOrders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          filteredOrders.map((order) => {
            const status = (order.status || "Placed").toLowerCase();
            return (
              <div
                key={order.id}
                className="card mb-3"
                style={{
                  background: "linear-gradient(-90deg, #edd8a7, #eeffdd14)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                <div className="card-header d-flex justify-content-between">
                  <span>
                    <Badge pill bg={getOrderStatusBadge(status)}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </span>
                  <span>
                    <strong>Order ID:</strong> {order.id}
                  </span>
                </div>
                <div className="card-body">
                  <div>
                    <strong>Ordered on:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                  <div>
                    <strong>Items:</strong>
                    <ul className="list-group">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item) => (
                          <li
                            key={item.id}
                            className="list-group-item d-flex align-items-center"  style={{
                              background: "linear-gradient(-60deg, #edd8a7, #eeffdd14)",
                              border: "none",
                            }} >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="order-item-image me-2"
                            />
                            {item.name} - Qty: {item.quantity}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No items available.</li>
                      )}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <strong>Cart Value:</strong> $
                    {typeof order.totalPrice === "number"
                      ? order.totalPrice
                      : order.totalPrice}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const getOrderStatusBadge = (status) => {
  switch (status) {
    case "processing":
      return "warning";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    default:
      return "secondary";
  }
};

export default OrderHistory;
