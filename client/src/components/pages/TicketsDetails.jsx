import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("username") || "Itaque alias dolorem";
  const userRole = localStorage.getItem("role") || "customer";
  const userEmail = localStorage.getItem("email") || "customer@example.com";

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setTicket(data);
      } catch (error) {
        // Fallback UI data
        setTicket({
          _id: id,
          ticketId: "#TKT-079451",
          subject: "Voluptatem aliquam a",
          category: "Account",
          priority: "Medium",
          status: "New",
          description: "Payment failed during order processing.",
          createdAt: "2026-03-01",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [id]);

  if (loading) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center min-vh-100" 
        style={{ backgroundColor: "#0b132b", color: "#ffffff" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-vh-100 text-white py-4 px-3 px-md-5" 
      style={{ backgroundColor: "#0b132b", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div className="container-lg">
        {/* Back Button */}
        <button
          className="btn btn-outline-light mb-4 rounded-pill px-4"
          style={{ borderColor: "#1c2541", backgroundColor: "#1c2541", color: "#6fffe9" }}
          onClick={() => navigate("/customer/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* User Info Card */}
        <div 
          className="card border-0 mb-4 p-4 rounded-4 text-white shadow-lg"
          style={{ backgroundColor: "#1c2541", backdropFilter: "blur(10px)" }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{ width: "65px", height: "65px", fontSize: "28px", backgroundColor: "#3a506b", color: "#6fffe9" }}
            >
              👤
            </div>
            <div>
              <h3 className="fw-bold mb-1" style={{ color: "#ffffff" }}>
                Welcome, {userName} 👋
              </h3>
              <div className="d-flex align-items-center gap-2 mt-1">
                <span 
                  className="badge rounded-pill text-capitalize px-3 py-1"
                  style={{ backgroundColor: "#007bff", fontSize: "12px" }}
                >
                  {userRole}
                </span>
                <span className="text-muted small">•</span>
                <span className="text-light opacity-75 small">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Detail Card */}
        <div 
          className="card border-0 p-4 rounded-4 text-white shadow-lg"
          style={{ backgroundColor: "#1c2541" }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <span style={{ color: "#007bff", fontSize: "20px" }}>🌐</span>
              <h4 className="fw-bold mb-0 text-white">
                Ticket Details: <span style={{ color: "#6fffe9" }}>{ticket?.ticketId || ticket?._id}</span>
              </h4>
            </div>

            <span
              className="badge rounded-pill px-3 py-2 text-white"
              style={{
                backgroundColor: ticket?.status === "Resolved" ? "#28a745" : "#007bff",
                fontSize: "13px"
              }}
            >
              {ticket?.status || "New"}
            </span>
          </div>

          <hr style={{ borderColor: "#3a506b" }} />

          {/* Details Row */}
          <div className="row g-4 my-2">
            <div className="col-md-6">
              <small className="text-uppercase tracking-wider opacity-75" style={{ color: "#a0aec0" }}>
                Subject
              </small>
              <h5 className="fw-semibold text-white mt-1">{ticket?.subject}</h5>
            </div>

            <div className="col-md-3">
              <small className="text-uppercase tracking-wider opacity-75" style={{ color: "#a0aec0" }}>
                Category
              </small>
              <h5 className="fw-semibold text-white mt-1">{ticket?.category || "General"}</h5>
            </div>

            <div className="col-md-3">
              <small className="text-uppercase tracking-wider opacity-75" style={{ color: "#a0aec0" }}>
                Priority
              </small>
              <div className="mt-1">
                <span
                  className="badge rounded-pill px-3 py-2 text-dark fw-bold"
                  style={{
                    backgroundColor: ticket?.priority === "High" ? "#ff4d4f" : "#ffc107"
                  }}
                >
                  {ticket?.priority || "Medium"}
                </span>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="mt-4">
            <small className="text-uppercase tracking-wider opacity-75" style={{ color: "#a0aec0" }}>
              Description
            </small>
            <div 
              className="p-3 rounded-3 mt-2 text-light"
              style={{ backgroundColor: "#0b132b", border: "1px solid #3a506b" }}
            >
              {ticket?.description || "No description provided for this ticket."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;