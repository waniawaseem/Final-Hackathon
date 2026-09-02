import Ticket from "../models/Tickets.js";

// ===============================
// CREATE TICKET
// ===============================
export const createTicket = async (req, res) => {
  try {
    const {
      subject,
      description,
      category,
    } = req.body;

    if (!subject || !description) {
      return res.status(400).json({
        success: false,
        message: "Subject and description are required",
      });
    }

    const userId =
      req.user._id ||
      req.user.id ||
      req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const ticketNumber =
      "TKT-" +
      Date.now().toString().slice(-6);

    const ticket = new Ticket({
      ticketNumber,
      customer: userId,
      subject,
      description,
      category: category || "Other",
      priority: "Medium",
      status: "New",
    });

    await ticket.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });

  } catch (error) {
    console.error("Create Ticket Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET MY TICKETS
// ===============================
export const getMyTickets = async (req, res) => {
  try {
    const userId =
      req.user._id ||
      req.user.id ||
      req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const tickets = await Ticket.find({
      customer: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tickets,
    });

  } catch (error) {
    console.error("Get My Tickets Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET ALL TICKETS - AGENT
// ===============================
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("customer", "name email")
      .populate("agent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tickets,
    });

  } catch (error) {
    console.error("Get All Tickets Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET SINGLE TICKET
// ===============================
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id)
      .populate("customer", "name email")
      .populate("agent", "name email");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });

  } catch (error) {
    console.error("Get Ticket By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// UPDATE TICKET
// ===============================
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      priority,
      category,
      resolutionNote,
    } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (status !== undefined) {
      ticket.status = status;
    }

    if (priority !== undefined) {
      ticket.priority = priority;
    }

    if (category !== undefined) {
      ticket.category = category;
    }

    if (resolutionNote !== undefined) {
      ticket.resolutionNote = resolutionNote;
    }

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });

  } catch (error) {
    console.error("Update Ticket Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// SEND MESSAGE
// ===============================
export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (!ticket.messages) {
      ticket.messages = [];
    }

    ticket.messages.push({
      message: message.trim(),
      senderRole: "agent",
    });

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      ticket,
    });

  } catch (error) {
    console.error("Send Message Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};