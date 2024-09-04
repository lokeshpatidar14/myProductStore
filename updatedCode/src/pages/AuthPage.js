import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import { signUp, logIn, resetPassword } from "../api/authAPI";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import "./AuthPage.css";
import { IoIosLogIn } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;
    try {
      if (isReset) {
        response = await resetPassword(email);
        setAlert({
          message: "Reset email sent",
          variant: "warning",
        });
        setLoading(false);
        return;
      }

      response = isSignUp
        ? await signUp(email, password)
        : await logIn(email, password);

      if (response.idToken) {
        dispatch(
          setUser({ user: { email: response.email }, token: response.idToken })
        );

        navigate ("/user");
      } else {
        setAlert({
          message: "Authentication failed",
          variant: "danger",
        });
      }
    } catch (error) {

      setAlert({
        message: "Error ",
        variant: "danger",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Card className="login-card">
        {alert.message && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ message: "", variant: "" })}
            dismissible>
            {alert.message}
          </Alert>
        )}
        <Form className="login-form" onSubmit={handleAuth}>
          <h2>
            {isReset ? (
              <RxReset />
            ) : isSignUp ? (
              <RiAccountCircleLine />
            ) : (
              <IoIosLogIn />
            )}
          </h2>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your Email"
            />
          </Form.Group>

          {!isReset && (
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Your Password"
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : isReset ? (
              "Reset Password"
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </Button>

          {!isReset && (
            <Button variant="link" onClick={() => setIsSignUp((prev) => !prev)}>
              {isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
            </Button>
          )}

          {!isSignUp && (
            <Button variant="link" onClick={() => setIsReset(true)}>
              Forgot Password?
            </Button>
          )}

          {isReset && (
            <Button variant="link" onClick={() => setIsReset(false)}>
              Back to Log In
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default AuthPage;
