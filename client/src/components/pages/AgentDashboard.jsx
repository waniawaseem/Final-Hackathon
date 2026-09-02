import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Ticket,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Headphones,
} from "lucide-react";

const AgentDashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Glassmorphism Theme Styling Objects
  const styles = {
    pageBackground: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top center, #1e3a8a 0%, #0f172a 100%)",
      color: "#f8fafc",
      paddingTop: "2rem",
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
    heading: {
      fontWeight: "800",
      letterSpacing: "-0.5px",
      background: "linear-gradient(120deg, #ffffff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    statNumber: {
      fontSize: "2.25rem",
      fontWeight: "800",
      letterSpacing: "-1px",
    },
    tableHeader: {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      color: "#94a3b8",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      textTransform: "uppercase",
      fontSize: "0.75rem",
      letterSpacing: "0.05em",
    },
    tableCell: {
      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
      color: "#e2e8f0",
      backgroundColor: "transparent",
    },
    // Glass Badges Styles
    badgeGlass: {
      borderWidth: "1px",
      borderStyle: "solid",
      backdropFilter: "blur(8px)",
      fontSize: "0.75rem",
      fontWeight: "600",
      letterSpacing: "0.02em",
    },
  };

  // =========================
  // FETCH AGENT TICKETS
  // =========================
  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tickets/agent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(response.data.tickets || response.data || []);
    } catch (error) {
      console.error("Fetch Agent Tickets Error:", error);

      setError(
        error?.response?.data?.message || "Unable to load agent tickets."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CHECK LOGIN + ROLE
  // =========================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "agent") {
      navigate("/customer/dashboard");
      return;
    }

    fetchTickets();
  }, []);

  // =========================
  // GLASS PRIORITY BADGES
  // =========================
  const priorityBadge = (priority) => {
    let styleConfig = {
      background: "rgba(100, 116, 139, 0.12)",
      borderColor: "rgba(148, 163, 184, 0.25)",
      color: "#cbd5e1",
    };

    if (priority === "High") {
      styleConfig = {
        background: "rgba(239, 68, 68, 0.12)",
        borderColor: "rgba(248, 113, 113, 0.3)",
        color: "#f87171",
      };
    } else if (priority === "Medium") {
      styleConfig = {
        background: "rgba(245, 158, 11, 0.12)",
        borderColor: "rgba(251, 191, 36, 0.3)",
        color: "#fbbf24",
      };
    } else if (priority === "Low") {
      styleConfig = {
        background: "rgba(34, 197, 94, 0.12)",
        borderColor: "rgba(74, 222, 128, 0.3)",
        color: "#4ade80",
      };
    }

    return (
      <span
        className="px-2.5 py-1 rounded-pill d-inline-block"
        style={{ ...styles.badgeGlass, ...styleConfig }}
      >
        {priority || "Pending"}
      </span>
    );
  };

  // =========================
  // GLASS STATUS BADGES
  // =========================
  const statusBadge = (status) => {
    let styleConfig = {
      background: "rgba(59, 130, 246, 0.12)",
      borderColor: "rgba(96, 165, 250, 0.3)",
      color: "#60a5fa",
    };

    if (status === "Resolved") {
      styleConfig = {
        background: "rgba(34, 197, 94, 0.12)",
        borderColor: "rgba(74, 222, 128, 0.3)",
        color: "#4ade80",
      };
    } else if (status === "In Progress") {
      styleConfig = {
        background: "rgba(6, 182, 212, 0.12)",
        borderColor: "rgba(34, 211, 238, 0.3)",
        color: "#22d3ee",
      };
    } else if (status === "Assigned") {
      styleConfig = {
        background: "rgba(168, 85, 247, 0.12)",
        borderColor: "rgba(192, 132, 252, 0.3)",
        color: "#c084fc",
      };
    }

    return (
      <span
        className="px-3 py-1 rounded-pill d-inline-block"
        style={{ ...styles.badgeGlass, ...styleConfig }}
      >
        {status || "New"}
      </span>
    );
  };

  // =========================
  // STATS
  // =========================
  const total = tickets.length;

  const open = tickets.filter(
    (ticket) => ticket.status !== "Resolved"
  ).length;

  const highPriority = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  // =========================
  // UI
  // =========================
  return (
    <div style={styles.pageBackground}>
      <Container>
        {/* HEADER */}
        <div className="mb-4 pb-2">
          <h2 style={styles.heading} className="mb-1">
            Agent Dashboard 🎧
          </h2>
          <p className="mb-0" style={{ color: "#94a3b8" }}>
            Welcome, {username || "Agent"}. Manage and resolve your assigned support tickets.
          </p>
        </div>

        {/* STATS */}
        <Row className="g-3 mb-4">
          {/* TOTAL */}
          <Col md={3}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    Assigned Tickets
                  </h6>
                  <div style={styles.statNumber} className="text-white">
                    {total}
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}
                >
                  <Ticket size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* OPEN */}
          <Col md={3}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    Open Tickets
                  </h6>
                  <div style={styles.statNumber} className="text-info">
                    {open}
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(6, 182, 212, 0.15)", color: "#22d3ee" }}
                >
                  <Clock size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* HIGH PRIORITY */}
          <Col md={3}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    High Priority
                  </h6>
                  <div style={styles.statNumber} className="text-danger">
                    {highPriority}
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
                >
                  <AlertTriangle size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RESOLVED */}
          <Col md={3}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    Resolved
                  </h6>
                  <div style={styles.statNumber} className="text-success">
                    {resolved}
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80" }}
                >
                  <CheckCircle2 size={24} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ERROR */}
        {error && (
          <Alert variant="danger" className="bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 rounded-3 mb-4">
            {error}
          </Alert>
        )}

        {/* TICKETS SECTION */}
        <Card style={styles.glassCard} className="border-0 overflow-hidden">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold mb-0 text-white d-flex align-items-center gap-2">
                <Headphones size={22} className="text-info" />
                Assigned Tickets Queue
              </h4>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="info" />
                <p className="mt-3 mb-0" style={{ color: "#94a3b8" }}>
                  Loading assigned tickets...
                </p>
              </div>
            ) : tickets.length === 0 ? (
              /* NO TICKETS */
              <div className="text-center py-5">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3"
                  style={{ background: "rgba(255, 255, 255, 0.05)", color: "#94a3b8" }}
                >
                  <Ticket size={48} />
                </div>
                <h5 className="text-white fw-bold">No assigned tickets</h5>
                <p style={{ color: "#94a3b8" }} className="mb-0">
                  All clear! New assigned tickets will appear here when available.
                </p>
              </div>
            ) : (
              /* TICKETS TABLE */
              <div className="table-responsive">
                <Table
                  variant="dark"
                  borderless
                  hover
                  className="align-middle mb-0 bg-transparent"
                >
                  <thead>
                    <tr>
                      <th style={styles.tableHeader} className="py-3 px-3">
                        Ticket ID
                      </th>
                      <th style={styles.tableHeader} className="py-3 px-3">
                        Subject
                      </th>
                      <th style={styles.tableHeader} className="py-3 px-3">
                        Category
                      </th>
                      <th style={styles.tableHeader} className="py-3 px-3">
                        Priority
                      </th>
                      <th style={styles.tableHeader} className="py-3 px-3">
                        Status
                      </th>
                      <th style={styles.tableHeader} className="py-3 px-3 text-end">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket._id}>
                        {/* TICKET NUMBER */}
                        <td style={styles.tableCell} className="py-3 px-3">
                          <span className="fw-bold" style={{ color: "#22d3ee" }}>
                            #{ticket.ticketNumber || ticket._id?.slice(-6)}
                          </span>
                        </td>

                        {/* SUBJECT */}
                        <td style={styles.tableCell} className="py-3 px-3 fw-semibold text-white">
                          {ticket.subject}
                        </td>

                        {/* CATEGORY */}
                        <td style={{ ...styles.tableCell, color: "#cbd5e1" }} className="py-3 px-3">
                          {ticket.category || "General"}
                        </td>

                        {/* PRIORITY */}
                        <td style={styles.tableCell} className="py-3 px-3">
                          {priorityBadge(ticket.priority)}
                        </td>

                        {/* STATUS */}
                        <td style={styles.tableCell} className="py-3 px-3">
                          {statusBadge(ticket.status)}
                        </td>

                        {/* ACTION */}
                        <td style={styles.tableCell} className="py-3 px-3 text-end">
                          <Button
                            size="sm"
                            className="rounded-pill px-3 d-inline-flex align-items-center gap-1 fw-semibold"
                            style={{
                              background: "rgba(59, 130, 246, 0.15)",
                              border: "1px solid rgba(96, 165, 250, 0.3)",
                              color: "#60a5fa",
                            }}
                            onClick={() =>
                              navigate(`/agent/ticket/${ticket._id}`)
                            }
                          >
                            Open Ticket
                            <ExternalLink size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AgentDashboard;