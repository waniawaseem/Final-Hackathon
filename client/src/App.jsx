import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

import CustomerDashboard from "./components/pages/CustomerDashboard.jsx";
import CreateTicket from "./components/pages/CreateTicket.jsx";
import TicketDetails from "./components/pages/TicketsDetails.jsx";

import AgentDashboard from "./components/pages/AgentDashboard.jsx";
import AgentTicket from "./components/pages/AgentTicket.jsx";
import AgentDetails from "./components/pages/AgentDetails.jsx";


// ================= ROLE PROTECTION =================

const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role hai
  if (userRole !== role) {
    if (userRole === "agent") {
      return <Navigate to="/agent/dashboard" replace />;
    }

    return <Navigate to="/customer/dashboard" replace />;
  }

  return children;
};


const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* ================= CUSTOMER ================= */}

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/create-ticket"
          element={
            <ProtectedRoute role="customer">
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/ticket/:id"
          element={
            <ProtectedRoute role="customer">
              <TicketDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= AGENT ================= */}

        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute role="agent">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent/ticket/:id"
          element={
            <ProtectedRoute role="agent">
              <AgentTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent/details"
          element={
            <ProtectedRoute role="agent">
              <AgentDetails />
            </ProtectedRoute>
          }
        />


        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

      <ToastContainer position="top-right" />

    </BrowserRouter>
  );
};

export default App;