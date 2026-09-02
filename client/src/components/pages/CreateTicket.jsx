import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Send } from "lucide-react";

const CreateTicket = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Glassmorphism Theme Styles
  const styles = {
    pageBackground: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top center, #1e3a8a 0%, #0f172a 100%)",
      color: "#f8fafc",
      paddingTop: "2.5rem",
      paddingBottom: "3rem",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: "1.25rem",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    },
    inputStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      color: "#f8fafc",
      borderRadius: "0.75rem",
    },
    labelStyle: {
      color: "#cbd5e1",
      fontSize: "0.9rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
    },
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitTicket = async (e) => {
    e.preventDefault();

    if (!form.subject.trim()) {
      setError("Subject is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/tickets/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const ticket = response.data.ticket || response.data;

      navigate(`/customer/ticket/${ticket._id}`);
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message || "Unable to create ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div style={styles.pageBackground}>
      <Container>
        {/* BACK BUTTON */}
        <div className="mb-4 mx-auto" style={{ maxWidth: "700px" }}>
          <Button
            className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#cbd5e1",
            }}
            onClick={() => navigate("/customer/dashboard")}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
        </div>

        {/* CREATE FORM CARD */}
        <Card
          className="border-0 mx-auto"
          style={{ maxWidth: "700px", ...styles.glassCard }}
        >
          <Card.Body className="p-4 p-md-5">
            <div className="mb-4">
              <h2 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
                Create Support Ticket
              </h2>
              <p className="mb-0" style={{ color: "#94a3b8" }}>
                Describe your issue below and our automated AI system will categorize and prioritize it.
              </p>
            </div>

            {error && (
              <Alert
                variant="danger"
                className="bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 rounded-3 mb-4"
              >
                {error}
              </Alert>
            )}

            <Form onSubmit={submitTicket}>
              {/* SUBJECT */}
              <Form.Group className="mb-4">
                <Form.Label style={styles.labelStyle}>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="e.g. Payment charged twice"
                  value={form.subject}
                  onChange={handleChange}
                  disabled={loading}
                  style={styles.inputStyle}
                  className="py-2.5 px-3 custom-glass-input"
                />
              </Form.Group>

              {/* DESCRIPTION */}
              <Form.Group className="mb-4">
                <Form.Label style={styles.labelStyle}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  placeholder="Explain your issue in detail..."
                  value={form.description}
                  onChange={handleChange}
                  disabled={loading}
                  style={styles.inputStyle}
                  className="py-2.5 px-3 custom-glass-input"
                />
              </Form.Group>

              {/* CATEGORY */}
              <Form.Group className="mb-4">
                <Form.Label style={styles.labelStyle}>
                  Category{" "}
                  <span style={{ color: "#64748b", fontWeight: "normal" }}>
                    (Optional)
                  </span>
                </Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={loading}
                  style={styles.inputStyle}
                  className="py-2.5 px-3 custom-glass-input"
                >
                  <option value="" style={{ background: "#0f172a", color: "#f8fafc" }}>
                    ✨ Let AI decide automatically
                  </option>
                  <option value="Billing" style={{ background: "#0f172a", color: "#f8fafc" }}>
                    Billing
                  </option>
                  <option value="Technical" style={{ background: "#0f172a", color: "#f8fafc" }}>
                    Technical
                  </option>
                  <option value="Account" style={{ background: "#0f172a", color: "#f8fafc" }}>
                    Account
                  </option>
                  <option value="Order" style={{ background: "#0f172a", color: "#f8fafc" }}>
                    Order
                  </option>
                  <option value="Other" style={{ background: "#0f172a", color: "#f8fafc" }}>
                    Other
                  </option>
                </Form.Select>
              </Form.Group>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-100 rounded-pill py-3 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-2"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  border: "none",
                  boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.39)",
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span>Creating & analyzing ticket...</span>
                  </>
                ) : (
                  <>
                    <span>Create Ticket</span>
                    <Send size={16} />
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CreateTicket;