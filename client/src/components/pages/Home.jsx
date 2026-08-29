import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
function Home() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      
      <h1>Welcome</h1>

      <button onClick={() => navigate("/login")}>
        Login
      </button>

      <button onClick={() => navigate("/signup")}>
        Signup
      </button>
    </Container>
  );
}

export default Home;