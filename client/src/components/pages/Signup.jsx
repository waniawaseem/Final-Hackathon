import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Spinner,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Lock, UserCheck, ShieldCheck } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Theme Styling Objects
  const styles = {
    pageBackground: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem 1rem",
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
      maxWidth: "460px",
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
    inputAddonStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.07)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "#94a3b8",
    },
    labelStyle: {
      color: "#cbd5e1",
      fontSize: "0.88rem",
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

    // Name
    if (!form.username.trim()) {
      newErrors.username = "Name is required";
    } else if (form.username.trim().length < 3) {
      newErrors.username = "Name must be at least 3 characters";
    }

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

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role
    if (!form.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Signup Handler
  const signupHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }
      );

      console.log("Signup Response:", response.data);

      // Save authentication data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("role", response.data.user.role);

      toast.success("Account created successfully!");

      // Route based on role
      if (response.data.user.role === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      console.error("Signup Error:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to sign up. Please try again.";

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
              🚀 Get Started Free
            </Badge>

            <h2 className="display-6" style={styles.heading}>
              Create Account
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Join us in just a few seconds
            </p>
          </div>

          <Form onSubmit={signupHandler} noValidate>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Full Name
              </Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ ...styles.inputAddonStyle, borderRight: "none" }}>
                  <User size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={form.username}
                  onChange={handleChange("username")}
                  isInvalid={!!errors.username}
                  disabled={loading}
                  style={{ ...styles.inputStyle, borderLeft: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Email Address */}
            <Form.Group className="mb-3">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Email Address
              </Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ ...styles.inputAddonStyle, borderRight: "none" }}>
                  <Mail size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  isInvalid={!!errors.email}
                  disabled={loading}
                  style={{ ...styles.inputStyle, borderLeft: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Account Type */}
            <Form.Group className="mb-3">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Account Type
              </Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ ...styles.inputAddonStyle, borderRight: "none" }}>
                  <UserCheck size={18} />
                </InputGroup.Text>
                <Form.Select
                  value={form.role}
                  onChange={handleChange("role")}
                  isInvalid={!!errors.role}
                  disabled={loading}
                  style={{ ...styles.inputStyle, borderLeft: "none", color: "#ffffff" }}
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

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Password
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text style={{ ...styles.inputAddonStyle, borderRight: "none" }}>
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                  isInvalid={!!errors.password}
                  disabled={loading}
                  style={{ ...styles.inputStyle, borderLeft: "none", borderRight: "none" }}
                />
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  style={{ ...styles.inputAddonStyle, borderLeft: "none" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4">
              <Form.Label style={styles.labelStyle} className="fw-semibold">
                Confirm Password
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text style={{ ...styles.inputAddonStyle, borderRight: "none" }}>
                  <ShieldCheck size={18} />
                </InputGroup.Text>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  isInvalid={!!errors.confirmPassword}
                  disabled={loading}
                  style={{ ...styles.inputStyle, borderLeft: "none", borderRight: "none" }}
                />
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  disabled={loading}
                  style={{ ...styles.inputAddonStyle, borderLeft: "none" }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
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
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            {/* Footer Navigation */}
            <p className="text-center mt-4 mb-0" style={{ color: "#94a3b8" }}>
              Already have an account?{" "}
              <span
                style={{
                  color: "#22d3ee",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;