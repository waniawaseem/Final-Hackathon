import express from "express";

import {
  createTicket,
  getMyTickets,
  getAllTickets,
  getTicketById,
  updateTicket,
  sendMessage,
} from "../controllers/ticketsControllers.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();


// ===============================
// CUSTOMER - CREATE TICKET
// ===============================
router.post(
  "/create",
  verifyToken,
  createTicket
);


// ===============================
// CUSTOMER - GET MY TICKETS
// ===============================
router.get(
  "/my",
  verifyToken,
  getMyTickets
);


// ===============================
// AGENT - GET ALL TICKETS
// ===============================
router.get(
  "/agent",
  verifyToken,
  getAllTickets
);


// ===============================
// GET SINGLE TICKET
// ===============================
router.get(
  "/:id",
  verifyToken,
  getTicketById
);


// ===============================
// UPDATE TICKET
// ===============================
router.put(
  "/:id",
  verifyToken,
  updateTicket
);


// ===============================
// SEND MESSAGE
// ===============================
router.post(
  "/:id/messages",
  verifyToken,
  sendMessage
);


// ===============================
// GET ALL TICKETS
// ===============================
router.get(
  "/",
  verifyToken,
  getAllTickets
);


export default router;