import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ username });

  if (!user) return res.status(401).json({ error: "Ungültige Anmeldedaten" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res.status(401).json({ error: "Ungültige Anmeldedaten" });

  const token = jwt.sign(
    { username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=86400`
  );
  res.status(200).json({ message: "Erfolgreich eingeloggt" });
}
