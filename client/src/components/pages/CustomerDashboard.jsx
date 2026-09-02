import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PlusCircle,
  Ticket,
  Clock,
  CheckCircle2,
  Eye,
  LifeBuoy,
} from "lucide-react";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Styling Objects to match application theme
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
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "1.25rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
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
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      color: "#94a3b8",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      textTransform: "uppercase",
      fontSize: "0.8rem",
      letterSpacing: "0.05em",
    },
    tableRow: {
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      color: "#e2e8f0",
    },
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/tickets/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(response.data.tickets || response.data || []);
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message || "Unable to load tickets."
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

    fetchTickets();
  }, []);

  const statusBadge = (status) => {
    if (status === "Resolved") {
      return (
        <Badge bg="success" className="bg-opacity-20 text-success border border-success border-opacity-20 px-3 py-2 rounded-pill fw-semibold">
          Resolved
        </Badge>
      );
    }

    if (status === "In Progress") {
      return (
        <Badge bg="warning" className="bg-opacity-20 text-warning border border-warning border-opacity-20 px-3 py-2 rounded-pill fw-semibold">
          In Progress
        </Badge>
      );
    }

    if (status === "Assigned") {
      return (
        <Badge bg="info" className="bg-opacity-20 text-info border border-info border-opacity-20 px-3 py-2 rounded-pill fw-semibold">
          Assigned
        </Badge>
      );
    }

    return (
      <Badge bg="primary" className="bg-opacity-20 text-primary border border-primary border-opacity-20 px-3 py-2 rounded-pill fw-semibold">
        New
      </Badge>
    );
  };

  const priorityBadge = (priority) => {
    if (priority === "High") {
      return (
        <Badge bg="danger" className="bg-opacity-20 text-danger border border-danger border-opacity-20 px-2 py-1 rounded">
          High
        </Badge>
      );
    }

    if (priority === "Medium") {
      return (
        <Badge bg="warning" className="bg-opacity-20 text-warning border border-warning border-opacity-20 px-2 py-1 rounded">
          Medium
        </Badge>
      );
    }

    if (priority === "Low") {
      return (
        <Badge bg="success" className="bg-opacity-20 text-success border border-success border-opacity-20 px-2 py-1 rounded">
          Low
        </Badge>
      );
    }

    return (
      <Badge bg="secondary" className="bg-opacity-20 text-secondary border border-secondary border-opacity-20 px-2 py-1 rounded">
        Pending
      </Badge>
    );
  };

  return (
    <div style={styles.pageBackground}>
      <Container>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-2">
          <div>
            <h2 style={styles.heading} className="mb-1">
              Welcome, {username || "Customer"} 👋
            </h2>
            <p className="mb-0" style={{ color: "#94a3b8" }}>
              Track and manage your submitted support tickets
            </p>
          </div>

          <Button
            className="d-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded-pill fw-bold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              border: "none",
            }}
            onClick={() => navigate("/customer/create-ticket")}
          >
            <PlusCircle size={18} />
            Create Ticket
          </Button>
        </div>

        {/* Statistics Cards */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    Total Tickets
                  </h6>
                  <div style={styles.statNumber} className="text-white">
                    {tickets.length}
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}
                >
                  <Ticket size={28} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    Active Tickets
                  </h6>
                  <div style={styles.statNumber} className="text-warning">
                    {
                      tickets.filter(
                        (ticket) => ticket.status !== "Resolved"
                      ).length
                    }
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}
                >
                  <Clock size={28} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={styles.glassCard} className="border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between p-4">
                <div>
                  <h6 className="text-uppercase fw-semibold mb-2" style={{ color: "#94a3b8", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                    Resolved
                  </h6>
                  <div style={styles.statNumber} className="text-success">
                    {
                      tickets.filter(
                        (ticket) => ticket.status === "Resolved"
                      ).length
                    }
                  </div>
                </div>
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(34, 197, 94, 0.15)", color: "#4ade80" }}
                >
                  <CheckCircle2 size={28} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 rounded-3 mb-4">
            {error}
          </Alert>
        )}

        {/* Tickets Section */}
        <Card style={styles.glassCard} className="border-0 overflow-hidden">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold mb-0 text-white d-flex align-items-center gap-2">
                <LifeBuoy size={22} className="text-info" />
                My Support Tickets
              </h4>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="info" />
                <p className="mt-3 mb-0" style={{ color: "#94a3b8" }}>
                  Fetching your tickets...
                </p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-5">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3"
                  style={{ background: "rgba(255, 255, 255, 0.05)", color: "#94a3b8" }}
                >
                  <Ticket size={48} />
                </div>
                <h5 className="text-white fw-bold">No tickets found</h5>
                <p style={{ color: "#94a3b8" }} className="mb-4">
                  You haven't submitted any support requests yet.
                </p>
                <Button
                  className="px-4 py-2 rounded-pill fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    border: "none",
                  }}
                  onClick={() => navigate("/customer/create-ticket")}
                >
                  Create Your First Ticket
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table className="align-middle mb-0" style={{ borderStyle: "hidden" }}>
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
                      <tr key={ticket._id} style={styles.tableRow}>
                        <td className="py-3 px-3">
                          <span className="fw-bold text-cyan" style={{ color: "#22d3ee" }}>
                            #{ticket.ticketNumber || ticket._id?.slice(-6)}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-white">
                          {ticket.subject}
                        </td>
                        <td className="py-3 px-3" style={{ color: "#cbd5e1" }}>
                          {ticket.category || "General"}
                        </td>
                        <td className="py-3 px-3">
                          {priorityBadge(ticket.priority)}
                        </td>
                        <td className="py-3 px-3">
                          {statusBadge(ticket.status)}
                        </td>
                        <td className="py-3 px-3 text-end">
                          <Button
                            size="sm"
                            variant="outline-info"
                            className="rounded-pill px-3 d-inline-flex align-items-center gap-1"
                            style={{ borderColor: "rgba(34, 211, 238, 0.4)", color: "#22d3ee" }}
                            onClick={() =>
                              navigate(`/customer/ticket/${ticket._id}`)
                            }
                          >
                            <Eye size={14} />
                            View
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

export default CustomerDashboard;