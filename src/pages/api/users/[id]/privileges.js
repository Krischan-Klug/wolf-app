import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "PATCH") {
    const { privileges } = req.body;
    const updated = await User.findByIdAndUpdate(
      id,
      { privileges },
      { new: true }
    );
    return res.status(200).json(updated);
  }

  res.status(405).end();
}
