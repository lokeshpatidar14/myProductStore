import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin-login";
  };

  return (
    <Navbar
      style={{
        background: "linear-gradient(100deg, #edd8a7, #eeffdd14) ",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px",
        position: "relative",
      }}>
      <Navbar.Brand>Welcome to Product Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/admin-products" className="nav-link">
            Products
          </NavLink>
          <NavLink to="/admin-orders" className="nav-link">
            Orders
          </NavLink>
          {/* <NavLink to="/admin-categories" className="nav-link">
            Categories
          </NavLink> */}
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminHeader;
