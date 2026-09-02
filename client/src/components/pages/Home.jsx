import { Container, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Custom Inline CSS for complex effects
  const styles = {
    // Vibrant radial background covering the whole screen
    pageBackground: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 0",
      // Deep Blue to Violet vibrant gradient
      background: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    // Glassmorphism effect card
    glassCard: {
      background: "rgba(255, 255, 255, 0.05)", // Semi-transparent white
      backdropFilter: "blur(10px)", // Blur background
      WebkitBackdropFilter: "blur(10px)", // Safari support
      borderRadius: "1.5rem", // rounded-5 equivalent
      border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", // Deep shadow
      overflow: "hidden",
    },
    // Cyan glow effect around the card
    cardGlow: {
      position: "relative",
      zIndex: 1,
    },
    glowOverlay: {
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: "120%",
      height: "120%",
      background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 70%)",
      zIndex: -1,
      filter: "blur(20px)",
    },
    topAccent: {
      height: "6px",
      // Gradient from Primary Blue to Cyan
      background: "linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)",
    },
    // Main Heading with gradient text
    mainHeading: {
      fontWeight: "800",
      letterSpacing: "-1px",
      background: "linear-gradient(120deg, #ffffff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "1rem",
    },
    // Secondary description text
    descriptionText: {
      color: "#94a3b8", // Muted slate gray
      fontSize: "1.2rem",
      lineHeight: "1.7",
      maxWidth: "550px",
      margin: "0 auto 2.5rem",
    },
    // Feature item styling
    featureBox: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1rem",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.pageBackground}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} xl={8} style={styles.cardGlow}>
            {/* Background Glow Overlay */}
            <div style={styles.glowOverlay}></div>

            {/* Main Glass Card */}
            <Card style={styles.glassCard} className="border-0">
              {/* Top accent bar */}
              <div style={styles.topAccent} />

              <Card.Body className="p-4 p-sm-5 text-center">
                {/* Modern pill badge */}
                <Badge
                  bg="info"
                  className="bg-opacity-10 text-info px-4 py-2 rounded-pill mb-4 fw-semibold shadow-sm"
                  style={{ border: "1px solid rgba(6, 182, 212, 0.2)", fontSize: '0.9rem' }}
                >
                  ⚡ Next-Generation AI
                </Badge>

                {/* Main Heading & Description */}
                <h1 className="display-4" style={styles.mainHeading}>
                  AI Customer <span style={{color: '#22d3ee'}}>Support Desk</span>
                </h1>

                <p style={styles.descriptionText}>
                  Experience seamless support. Submit your ticket and let our
                  advanced AI handle categorization, prioritization, and summaries
                  instantly.
                </p>

                {/* Call to Action Buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5 mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-5 py-3 rounded-pill fw-bold shadow"
                    style={{
                      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      border: "none",
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.03)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate("/login")}
                  >
                    Login to Portal
                  </Button>

                  <Button
                    variant="outline-light"
                    size="lg"
                    className="px-5 py-3 rounded-pill fw-bold"
                    style={{
                      borderWidth: '2px',
                      borderColor: 'rgba(255,255,255,0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                      e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Create Account
                  </Button>
                </div>

                {/* Feature Highlights Grid */}
                <Row className="g-3 pt-5 border-top" style={{borderColor: 'rgba(255,255,255,0.08) !important'}}>
                  <Col xs={12} sm={4}>
                    <div className="d-flex align-items-center gap-3 feature-item" style={styles.featureBox}>
                      <div className="fs-2">🤖</div>
                      <div>
                        <div className="fw-bold text-white fs-6">Smart</div>
                        <small style={{color: '#94a3b8'}}>Categorization</small>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={4}>
                    <div className="d-flex align-items-center gap-3 feature-item" style={styles.featureBox}>
                      <div className="fs-2">⚡</div>
                      <div>
                        <div className="fw-bold text-white fs-6">Fast</div>
                        <small style={{color: '#94a3b8'}}>Prioritization</small>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={4}>
                    <div className="d-flex align-items-center gap-3 feature-item" style={styles.featureBox}>
                      <div className="fs-2">📝</div>
                      <div>
                        <div className="fw-bold text-white fs-6">Instant</div>
                        <small style={{color: '#94a3b8'}}>Summaries</small>
                      </div>
                    </div>
                  </Col>
                </Row>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;