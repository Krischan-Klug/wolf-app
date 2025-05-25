import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  try {
    await dbConnect();
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Ungültige Anmeldedaten" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Ungültige Anmeldedaten" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        privileges: user.privileges,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.setHeader("Set-Cookie", [
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`,
    ]);

    res.status(200).json({ message: "Erfolgreich eingeloggt" });
  } catch (error) {
    console.error("Login-Fehler:", error);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
}
