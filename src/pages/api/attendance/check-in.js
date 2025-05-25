import Attendance from "@/models/Attendance";
import { getTokenFromRequest } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ message: "Nicht eingeloggt" });

  const userId = token.userId;
  const username = token.username;

  const { status, reason } = req.body;

  if (!status || !["anwesend", "abwesend"].includes(status)) {
    return res.status(400).json({ message: "Ungültiger Status" });
  }

  if (status === "abwesend" && (!reason || reason.trim() === "")) {
    return res
      .status(400)
      .json({ message: "Grund für Abwesenheit ist erforderlich" });
  }

  const now = new Date();
  const isTuesday = now.getDay() === 2; // Dienstag
  const hour = now.getHours();

  if (!isTuesday || hour < 12 || hour >= 18) {
    return res
      .status(403)
      .json({ message: "Nur dienstags von 12–18 Uhr möglich" });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const existing = await Attendance.findOne({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (existing) {
    return res
      .status(409)
      .json({ message: "Du hast dich heute bereits eingetragen" });
  }

  await Attendance.create({
    userId,
    username,
    status,
    reason: status === "abwesend" ? reason : undefined,
    date: new Date(),
  });

  return res.status(200).json({ message: "Eintrag erfolgreich gespeichert" });
}
