import express from "express";
import QRCode from "qrcode";
import Reservation from "../models/Reservation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PROTECTED: Get all reservations for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservations" });
  }
});

// PROTECTED: Get a single reservation by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id, userId: req.user.id });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservation" });
  }
});

// PROTECTED: Create a reservation
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { event, date, slot } = req.body;
    const userId = req.user.id; // Extracted from JWT

    const qrCodeData = `${userId}-${event}-${date}-${slot}-${Date.now()}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    const reservation = await Reservation.create({ userId, event, date, slot, qrCode: qrCodeImage });
    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (err) {
    res.status(500).json({ message: "Error creating reservation" });
  }
});

// PROTECTED: Update a reservation
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { event, date, slot } = req.body;
    const updatedReservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { event, date, slot },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation updated", updatedReservation });
  } catch (err) {
    res.status(500).json({ message: "Error updating reservation" });
  }
});

// PROTECTED: Delete a reservation
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedReservation = await Reservation.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reservation" });
  }
});

export default router;
