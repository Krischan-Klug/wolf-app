// pages/api/users/[id]/privileges.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Nur PATCH erlaubt" });
  }

  const token = req.cookies?.token;
  const { secret, privileges } = req.body;

  // Admin-Secret prüfen
  if (!token || secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: "Nicht autorisiert" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Ungültiger Token" });
  }

  // Dev-Priviligien prüfen
  if (!decoded?.privileges?.admin) {
    return res.status(403).json({ error: "Kein Dev-Zugriff" });
  }

  await dbConnect();
  const { id } = req.query;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { privileges },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Benutzer nicht gefunden" });
    }

    res
      .status(200)
      .json({ message: "Privilegien aktualisiert", user: updatedUser });
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
    res.status(500).json({ error: "Serverfehler" });
  }
}
