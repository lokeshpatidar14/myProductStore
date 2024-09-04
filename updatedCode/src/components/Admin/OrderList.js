import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Alert,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import {
  getOrdersForAdmin,
  updateOrder,
  deleteOrder,
} from "../../api/orderAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersForAdmin();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch order");
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
      setError("Failed to update order");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (err) {
      setError("Failed to delete order");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading orders...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(-100deg ,  #edd8a7, #eeffdd14 )",
        padding: "30px",
        margin: "1px",
      }}>
      <Row>
        <Col>
          <h2>Orders</h2>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {orders.length === 0 ? (
        <Row>
          <Col>
            <Alert variant="info">No orders found.</Alert>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Table
              hover
              responsive
              style={{
                background: "linear-gradient(180deg, #edd8a7, #eeffdd14)",
              }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const totalPrice = order.items
                    ? order.items.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                    : 0;

                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {Array.isArray(order.items) &&
                        order.items.length > 0 ? (
                          <Table bordered size="sm">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item) => (
                                <tr key={item.id}>
                                  <td>
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      rounded
                                      width={50}
                                      height={50}
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                  <td>${item.price}</td>
                                  <td>{item.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <span>No items available.</span>
                        )}
                      </td>
                      <td>${totalPrice.toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "bg-success"
                              : order.status === "Shipped"
                              ? "bg-info"
                              : order.status === "Processing"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}>
                          {order.status || "Placed"}
                        </span>
                      </td>
                      <td>{order.address}</td>
                      <td>
                        <ButtonGroup vertical>
                          <Button
                            variant="warning"
                            size="sm"
                            className="mb-2"
                            onClick={() =>
                              handleStatusChange(order.id, "Processing")
                            }>
                            Mark as Processing
                          </Button>
                          <Button
                            variant="info"
                            size="sm"
                            className="mb-2"
                            onClick={() =>
                              handleStatusChange(order.id, "Shipped")
                            }>
                            Mark as Shipped
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            className="mb-2"
                            onClick={() =>
                              handleStatusChange(order.id, "Delivered")
                            }>
                            Mark as Delivered
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(order.id)}>
                            Delete Order
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderList;
