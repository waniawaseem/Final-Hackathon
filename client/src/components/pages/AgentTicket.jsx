import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Send,
  Bot,
  MessageSquare,
  Sliders,
  CheckCircle,
} from "lucide-react";

const AgentTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");

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
      fontSize: "0.875rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
    },
  };

  const fetchTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.ticket || response.data;

      setTicket(data);
      setStatus(data.status || "New");
      setPriority(data.priority || "");
      setCategory(data.category || "");
      setResolutionNote(data.resolutionNote || "");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Unable to load ticket details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTicket();
  }, [id]);

  const updateTicket = async () => {
    if (status === "Resolved" && !resolutionNote.trim()) {
      setError("Resolution note is required before marking as resolved.");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        {
          status,
          priority,
          category,
          resolutionNote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchTicket();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Unable to update ticket status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    try {
      setSending(true);
      setError("");

      await axios.post(
        `http://localhost:5000/api/tickets/${id}/messages`,
        {
          message: message.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");
      await fetchTicket();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Unable to send response."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground} className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="info" />
          <p className="mt-3 text-slate-400">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div style={styles.pageBackground}>
        <Container className="py-5">
          <Alert variant="danger" className="bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 rounded-3">
            {error || "Ticket not found."}
          </Alert>
          <Button
            className="rounded-pill px-4"
            variant="outline-light"
            onClick={() => navigate("/agent/dashboard")}
          >
            Back to Dashboard
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <Container>
        {/* BACK BUTTON */}
        <div className="mb-4">
          <Button
            className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#cbd5e1",
            }}
            onClick={() => navigate("/agent/dashboard")}
          >
            <ArrowLeft size={16} /> Back to Agent Dashboard
          </Button>
        </div>

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError("")}
            className="bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 rounded-3 mb-4"
          >
            {error}
          </Alert>
        )}

        <Row className="g-4">
          {/* LEFT SIDE: TICKET DETAILS & CONVERSATION */}
          <Col lg={8}>
            {/* TICKET DESCRIPTION CARD */}
            <Card style={styles.glassCard} className="border-0 mb-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-bold fs-6" style={{ color: "#22d3ee" }}>
                    Ticket #{ticket.ticketNumber || ticket._id?.slice(-6)}
                  </span>
                </div>

                <h3 className="fw-bold text-white mb-3">{ticket.subject}</h3>

                <div
                  className="p-3.5 rounded-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    color: "#e2e8f0",
                    lineHeight: "1.6",
                  }}
                >
                  {ticket.description}
                </div>
              </Card.Body>
            </Card>

            {/* AI TRIAGE CARD */}
            <Card style={styles.glassCard} className="border-0 mb-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Bot className="text-info" size={22} />
                  <h5 className="fw-bold text-white mb-0">AI Triage Insights</h5>
                </div>

                <div
                  className="p-3 rounded-3 mb-3"
                  style={{
                    background: "rgba(6, 182, 212, 0.08)",
                    border: "1px solid rgba(34, 211, 238, 0.2)",
                  }}
                >
                  <Row className="g-3">
                    <Col md={6}>
                      <span className="text-slate-400 d-block fs-7 mb-1">Suggested Category</span>
                      <strong className="text-cyan-300">
                        {ticket.aiCategory || ticket.category || "Not analyzed"}
                      </strong>
                    </Col>
                    <Col md={6}>
                      <span className="text-slate-400 d-block fs-7 mb-1">Suggested Priority</span>
                      <strong className="text-cyan-300">
                        {ticket.aiPriority || ticket.priority || "Not analyzed"}
                      </strong>
                    </Col>
                  </Row>
                </div>

                <div>
                  <span className="text-slate-400 d-block fs-7 mb-1">AI Issue Summary</span>
                  <p className="mb-0 text-slate-300 fs-6">
                    {ticket.aiSummary || "AI summary not generated for this ticket."}
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* CONVERSATION HISTORY */}
            <Card style={styles.glassCard} className="border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <MessageSquare size={20} className="text-info" />
                  <h5 className="fw-bold text-white mb-0">Ticket Discussion</h5>
                </div>

                {ticket.messages?.length ? (
                  <div className="d-flex flex-column gap-3 mb-4">
                    {ticket.messages.map((msg, index) => {
                      const isAgent = msg.senderRole === "agent";
                      return (
                        <div
                          key={msg._id || index}
                          className={`d-flex flex-column ${
                            isAgent ? "align-items-end" : "align-items-start"
                          }`}
                        >
                          <small className="mb-1 text-slate-400 px-1 fs-7">
                            {isAgent ? "You (Agent)" : "Customer"}
                          </small>
                          <div
                            className="p-3 rounded-4"
                            style={{
                              maxWidth: "80%",
                              backgroundColor: isAgent
                                ? "rgba(37, 99, 235, 0.25)"
                                : "rgba(255, 255, 255, 0.06)",
                              border: isAgent
                                ? "1px solid rgba(96, 165, 250, 0.3)"
                                : "1px solid rgba(255, 255, 255, 0.1)",
                              color: "#f8fafc",
                            }}
                          >
                            {msg.message}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-400 mb-4 italic">No conversation history yet.</p>
                )}

                {/* REPLY INPUT */}
                {ticket.status !== "Resolved" ? (
                  <Form onSubmit={sendMessage} className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write a response to the customer..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={sending}
                        style={styles.inputStyle}
                        className="p-3"
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        border: "none",
                      }}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span>Sending Response...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Reply</span>
                          <Send size={15} />
                        </>
                      )}
                    </Button>
                  </Form>
                ) : (
                  <Alert className="bg-success bg-opacity-10 text-success border border-success border-opacity-20 rounded-3 mb-0">
                    This ticket has been marked as <strong>Resolved</strong>.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT SIDE: CONTROLS */}
          <Col lg={4}>
            <Card
              className="border-0 sticky-top"
              style={{ top: "2rem", ...styles.glassCard }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Sliders size={18} className="text-info" />
                  <h5 className="fw-bold text-white mb-0">Management Controls</h5>
                </div>

                {/* CATEGORY SELECT */}
                <Form.Group className="mb-3">
                  <Form.Label style={styles.labelStyle}>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.inputStyle}
                    className="py-2 px-3"
                  >
                    <option value="" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      Select Category
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

                {/* PRIORITY SELECT */}
                <Form.Group className="mb-3">
                  <Form.Label style={styles.labelStyle}>Priority</Form.Label>
                  <Form.Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={styles.inputStyle}
                    className="py-2 px-3"
                  >
                    <option value="" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      Select Priority
                    </option>
                    <option value="Low" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      Low
                    </option>
                    <option value="Medium" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      Medium
                    </option>
                    <option value="High" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      High
                    </option>
                  </Form.Select>
                </Form.Group>

                {/* STATUS SELECT */}
                <Form.Group className="mb-3">
                  <Form.Label style={styles.labelStyle}>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={styles.inputStyle}
                    className="py-2 px-3"
                  >
                    <option value="New" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      New
                    </option>
                    <option value="Assigned" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      Assigned
                    </option>
                    <option value="In Progress" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      In Progress
                    </option>
                    <option value="Resolved" style={{ background: "#0f172a", color: "#f8fafc" }}>
                      Resolved
                    </option>
                  </Form.Select>
                </Form.Group>

                {/* RESOLUTION NOTE */}
                {status === "Resolved" && (
                  <Form.Group className="mb-3">
                    <Form.Label style={styles.labelStyle}>Resolution Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Summarize the solution applied..."
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      style={styles.inputStyle}
                      className="p-3"
                    />
                  </Form.Group>
                )}

                {/* SAVE BUTTON */}
                <Button
                  className="w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-4"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    border: "none",
                    boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.35)",
                  }}
                  onClick={updateTicket}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AgentTicket;