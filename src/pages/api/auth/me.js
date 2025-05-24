import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Nicht eingeloggt" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ error: "Ungültiges Token" });
  }
}
