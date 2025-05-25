import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password, secret, isAdmin } = req.body;

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: "Nicht autorisiert" });
  }

  try {
    await dbConnect();

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Benutzer existiert bereits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: !!isAdmin,
    });

    await newUser.save();

    res.status(201).json({ message: "Benutzer erstellt" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
}
