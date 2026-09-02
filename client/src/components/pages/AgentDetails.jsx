import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, ShieldCheck, CheckCircle2, LayoutDashboard, Ticket, Bot, MessageSquare } from "lucide-react";

const AgentDetails = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role") || "agent";

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
    sectionBox: {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "0.75rem",
    },
  };

  return (
    <div style={styles.pageBackground}>
      <Container>
        {/* Back Button */}
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
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
        </div>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card style={styles.glassCard} className="border-0">
              <Card.Body className="p-4 p-md-5">
                {/* Profile Avatar Header */}
                <div className="text-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
                      color: "#ffffff",
                    }}
                  >
                    <User size={44} />
                  </div>

                  <h2 className="fw-bold text-white mb-1">
                    {username || "Agent Account"}
                  </h2>

                  <p className="text-slate-400 mb-3 fs-6">
                    {email || "No email provided"}
                  </p>

                  <Badge
                    className="px-3 py-2 text-uppercase fw-bold"
                    style={{
                      background: "rgba(34, 211, 238, 0.15)",
                      color: "#22d3ee",
                      border: "1px solid rgba(34, 211, 238, 0.3)",
                      borderRadius: "20px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Support Agent
                  </Badge>
                </div>

                <hr style={{ borderColor: "rgba(255, 255, 255, 0.1)" }} className="my-4" />

                {/* Agent Details Summary */}
                <h5 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                  <ShieldCheck className="text-info" size={18} />
                  Agent Information
                </h5>

                <div style={styles.sectionBox} className="p-3 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-slate-400 d-flex align-items-center gap-2">
                      <User size={15} /> Username
                    </span>
                    <strong className="text-white">{username || "N/A"}</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-slate-400 d-flex align-items-center gap-2">
                      <Mail size={15} /> Email
                    </span>
                    <strong className="text-white">{email || "N/A"}</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-slate-400 d-flex align-items-center gap-2">
                      <ShieldCheck size={15} /> Role
                    </span>
                    <strong className="text-capitalize text-cyan-400" style={{ color: "#22d3ee" }}>
                      {role}
                    </strong>
                  </div>
                </div>

                {/* Responsibilities */}
                <h5 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                  <CheckCircle2 className="text-info" size={18} />
                  Agent Responsibilities
                </h5>

                <div className="d-flex flex-column gap-2 mb-4">
                  <div style={styles.sectionBox} className="p-3 text-slate-200 d-flex align-items-center gap-3">
                    <Ticket className="text-info" size={18} />
                    <span>Manage assigned support tickets</span>
                  </div>

                  <div style={styles.sectionBox} className="p-3 text-slate-200 d-flex align-items-center gap-3">
                    <Bot className="text-info" size={18} />
                    <span>Review AI ticket suggestions</span>
                  </div>

                  <div style={styles.sectionBox} className="p-3 text-slate-200 d-flex align-items-center gap-3">
                    <MessageSquare className="text-info" size={18} />
                    <span>Reply to customer inquiries</span>
                  </div>

                  <div style={styles.sectionBox} className="p-3 text-slate-200 d-flex align-items-center gap-3">
                    <CheckCircle2 className="text-success" size={18} />
                    <span>Resolve customer issues</span>
                  </div>
                </div>

                {/* Dashboard Navigation Button */}
                <Button
                  className="w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    border: "none",
                    boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.35)",
                  }}
                  onClick={() => navigate("/agent/dashboard")}
                >
                  <LayoutDashboard size={18} />
                  <span>Go to Agent Dashboard</span>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AgentDetails;