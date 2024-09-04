import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { saveUserData } from "../../api/userApi";
import { updateUser } from "../../slices/authSlice";
import "./UserProfile.css";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [isEditing, setIsEditing] = useState(!user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const userData = { name, phone, address };
      await saveUserData(userId, userData);
      dispatch(updateUser(userData));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="user-profile-page">
      <Card className="user-profile">
        <Card.Body>
          <Card.Title className="text-center">User Profile</Card.Title>
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Saving...</p>
            </div>
          ) : isEditing ? (
            <Form>
              <Form.Group className="profile-field" controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="profile-field" controlId="formPhone">
                <Form.Control
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="profile-field" controlId="formAddress">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="secondary"
                className="save-button"
                onClick={handleSave}
                block
              >
                Save
              </Button>
            </Form>
          ) : (
            <div className="profile-view">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Address:</strong> {address}</p>
              <Button
                variant="secondary"
                className="edit-button"
                onClick={handleEdit}
                block
              >
                Edit
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
