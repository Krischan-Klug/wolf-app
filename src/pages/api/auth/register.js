import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password, secret } = req.body;
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: "Nicht autorisiert" });
  }

  const client = await clientPromise;
  const db = client.db();

  const existing = await db.collection("users").findOne({ username });
  if (existing)
    return res.status(400).json({ error: "Benutzer existiert bereits" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .collection("users")
    .insertOne({ username, password: hashedPassword });

  res.status(201).json({ message: "Benutzer erstellt" });
}
