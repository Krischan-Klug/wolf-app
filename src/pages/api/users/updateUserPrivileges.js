import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { privilegesShema } from "@/lib/structureSchemas";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const token = req.cookies?.token;
  const { secret } = req.body;

  if (!token || secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: "Nicht autorisiert" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Ungültiger Token" });
  }

  if (!decoded?.privileges?.dev) {
    return res.status(403).json({ error: "Kein Dev-Zugriff" });
  }

  try {
    await dbConnect();

    const users = await User.find({});
    let updatedCount = 0;

    for (const user of users) {
      try {
        const current = user.privileges || {};
        const updatedPrivileges = {};
        let updated = false;

        for (const key of privilegesShema) {
          if (key in current) {
            updatedPrivileges[key] = current[key];
          } else {
            updatedPrivileges[key] = false;
            updated = true;
          }
        }

        const oldKeys = Object.keys(current);
        const removedKeys = oldKeys.filter(
          (key) => !privilegesShema.includes(key)
        );
        if (removedKeys.length > 0) {
          updated = true;
        }

        if (updated) {
          user.privileges = updatedPrivileges;
          user.markModified("privileges");
          await user.save();
          updatedCount++;
        }
      } catch (e) {
        console.error("Fehler bei User:", user?._id?.toString(), e);
      }
    }

    return res
      .status(200)
      .json({ message: `${updatedCount} Nutzer aktualisiert.` });
  } catch (err) {
    console.error("Update-Fehler:", err);
    return res.status(500).json({ error: "Serverfehler beim Updaten" });
  }
}
