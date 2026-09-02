import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Spinner,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail, UserCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Custom Styles matching Home Page Theme
  const styles = {
    pageBackground: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      background: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "1.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      overflow: "hidden",
      width: "100%",
      maxWidth: "440px",
    },
    topAccent: {
      height: "6px",
      background: "linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)",
    },
    heading: {
      fontWeight: "800",
      letterSpacing: "-0.5px",
      background: "linear-gradient(120deg, #ffffff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    inputStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.07)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "#ffffff",
      borderRadius: "0.5rem",
    },
    labelStyle: {
      color: "#cbd5e1",
      fontSize: "0.9rem",
    },
  };

  // Handle input changes
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Role
    if (!form.role) {
      newErrors.role = "Please select your account type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login Handler
  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
        role: form.role,
      });

      console.log("Login Response:", response.data);

      // Save authentication data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("role", response.data.user.role);

      toast.success("Login successful!");

      // Separate dashboard based on role
      if (response.data.user.role === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error?.response?.data?.message || "Invalid email or password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <Card style={styles.glassCard} className="border-0">
        {/* Top Accent Gradient Bar */}
        <div style={styles.topAccent} />

        <Card.Body className="p-4 p-sm-5">
          {/* Header */}
          <div className="text-center mb-4">
            <Badge
              bg="info"
              className="bg-opacity-10 text-info px-3 py-2 rounded-pill mb-3 fw-semibold"
              style={{ border: "1px solid rgba(6, 182, 212, 0.2)" }}
            >
              🔐 Portal Access
            </Badge>

            <h2 className="display-6" style={styles.heading}>
              Welcome Back
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Log in to manage your support tickets
            </p>
          </div>

          <Form onSubmit={loginHandler} noValidate>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Email Address
              </Form.Label>
              <InputGroup>
                <InputGroup.Text
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRight: "none",
                    color: "#94a3b8",
                  }}
                >
                  <Mail size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  isInvalid={!!errors.email}
                  disabled={loading}
                  style={{
                    ...styles.inputStyle,
                    borderLeft: "none",
                  }}
                  className="custom-dark-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Account Type Selection */}
            <Form.Group className="mb-3">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Login As
              </Form.Label>
              <InputGroup>
                <InputGroup.Text
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRight: "none",
                    color: "#94a3b8",
                  }}
                >
                  <UserCheck size={18} />
                </InputGroup.Text>
                <Form.Select
                  value={form.role}
                  onChange={handleChange("role")}
                  isInvalid={!!errors.role}
                  disabled={loading}
                  style={{
                    ...styles.inputStyle,
                    borderLeft: "none",
                    color: "#ffffff",
                  }}
                >
                  <option value="customer" style={{ background: "#0f172a", color: "#fff" }}>
                    Customer
                  </option>
                  <option value="agent" style={{ background: "#0f172a", color: "#fff" }}>
                    Support Agent
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Password
              </Form.Label>

              <InputGroup hasValidation>
                <InputGroup.Text
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRight: "none",
                    color: "#94a3b8",
                  }}
                >
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange("password")}
                  isInvalid={!!errors.password}
                  disabled={loading}
                  style={{
                    ...styles.inputStyle,
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                />

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderLeft: "none",
                    color: "#94a3b8",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-100 py-3 rounded-pill fw-bold shadow mt-2"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                border: "none",
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>

            {/* Footer Links */}
            <p className="text-center mt-4 mb-0" style={{ color: "#94a3b8" }}>
              Don't have an account?{" "}
              <span
                style={{
                  color: "#22d3ee",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;