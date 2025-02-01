import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: String, required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Reservation", reservationSchema);
