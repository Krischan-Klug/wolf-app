// models/Attendance.js
import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  status: { type: String, enum: ["anwesend", "abwesend"], required: true },
  reason: { type: String }, // nur bei Abwesenheit
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
