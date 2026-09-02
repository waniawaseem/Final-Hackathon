import { Navbar as BootstrapNavbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDashboard = () => {
    if (role === "agent") {
      navigate("/agent/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  };

  return (
    <BootstrapNavbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow-sm py-2 px-3 border-bottom border-secondary border-opacity-25"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(33, 37, 41, 0.95)",
      }}
    >
      <Container>
        {/* Brand Logo */}
        <BootstrapNavbar.Brand
          onClick={() => navigate("/")}
          className="d-flex align-items-center gap-2 fs-4 fw-bold text-white user-select-none"
          style={{ cursor: "pointer" }}
        >
          <span className="fs-3">🎧</span>
          <span>
            Support<span className="text-primary">Desk</span>
          </span>
        </BootstrapNavbar.Brand>

        {/* Mobile Toggle Button */}
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none" />

        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2 pt-3 pt-lg-0">
            {token ? (
              <>
                {/* User Role Badge & Name */}
                <div className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 px-3 py-2 rounded-pill text-light my-1 my-lg-0">
                  <span>👤</span>
                  <span className="fw-semibold">{username || "User"}</span>
                  {role && (
                    <Badge bg={role === "agent" ? "info" : "primary"} className="text-capitalize ms-1">
                      {role}
                    </Badge>
                  )}
                </div>

                {/* Dashboard Button */}
                <Button
                  variant="outline-light"
                  className="rounded-pill px-3 fw-medium"
                  onClick={handleDashboard}
                >
                  Dashboard
                </Button>

                {/* Logout Button */}
                <Button
                  variant="danger"
                  className="rounded-pill px-3 fw-medium bg-gradient"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Button
                  variant="outline-light"
                  className="rounded-pill px-4 fw-medium"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                {/* Sign Up Button */}
                <Button
                  variant="primary"
                  className="rounded-pill px-4 fw-medium shadow-sm"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;