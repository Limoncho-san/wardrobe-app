import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { userId, event, date, slot } = req.body;

    if (!userId || !event || !date || !slot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReservation = new Reservation({ userId, event, date, slot });
    await newReservation.save();

    res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }); 
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
