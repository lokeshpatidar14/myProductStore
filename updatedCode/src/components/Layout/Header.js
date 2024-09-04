import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Badge, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../slices/authSlice";
import { SlSettings } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { BsCart } from "react-icons/bs";
import { FaRegClipboard } from "react-icons/fa";
import { filterProducts } from "../../slices/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e) => {
    dispatch(filterProducts(e.target.value));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(100deg, #edd8a7, #eeffdd14)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px",
        position: "relative",
      }}>
      <Navbar.Brand as={Link} to="/user">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          style={{ height: "50px" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/user" style={{ margin: "0 10px" }}>
            <IoHomeOutline style={{ fontSize: "2rem" }} />
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" style={{ margin: "0 10px" }}>
            <VscAccount style={{ fontSize: "2rem" }} />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/cart"
            style={{ margin: "0 10px", position: "relative" }}>
            <BsCart style={{ fontSize: "2rem" }} />
            {totalCartQuantity > 0 && (
              <Badge
                bg="danger"
                pill
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "-3px",
                  fontSize: "0.8rem",
                }}>
                {totalCartQuantity}
              </Badge>
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/user-orders" style={{ margin: "0 10px" }}>
            <FaRegClipboard style={{ fontSize: "2rem" }} />
          </Nav.Link>
        </Nav>
        <Nav>
          <FormControl
            type="text"
            placeholder="Search products..."
            style={{ margin: "0 100px" }}
            onChange={handleSearch}
          />
          <Nav.Link
            as={Link}
            to="/admin-login"
            style={{
              position: "absolute",
              right: "100px",
              top: "50%",
              transform: "translateY(-50%)",
            }}>
            <SlSettings style={{ fontSize: "2rem" }} />
          </Nav.Link>
          {token && (
            <Button
              variant="outline-danger"
              onClick={handleLogOut}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
              }}>
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
