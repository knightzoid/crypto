import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "test@test.com" && password === "test") {
      navigate("/dashboard");
    } else {
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Form.Text id="email" muted>
            Please input test@test.com as your email
          </Form.Text>
        </div>
        <div className="form-group">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Form.Text id="password" muted>
            Please input test as your password
          </Form.Text>
        </div>
        {errorMessage && (
          <Alert variant="danger">
            <p>{errorMessage}</p>
          </Alert>
        )}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
