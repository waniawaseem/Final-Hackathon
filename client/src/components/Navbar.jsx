import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");


  const logoutHandler = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("username");
    localStorage.removeItem("email");

    navigate("/login");
  };

 return (
  <Navbar expand="lg" bg="dark" variant="dark">
    <Container>

      <Navbar.Brand
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Home
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-lg-center gap-2">

          
          {token ? (
            <>
              <Navbar.Text className="text-light">
                👤 {username}
              </Navbar.Text>

              <Navbar.Text className="text-light">
                📧 {email}
              </Navbar.Text>

              <Button
                variant="outline-danger"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                variant="warning"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}

        </Nav>
      </Navbar.Collapse>

    </Container>
  </Navbar>
)};

export default MyNavbar;