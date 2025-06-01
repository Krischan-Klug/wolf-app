import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { search = "" } = req.query;
    const users = await User.find({
      username: { $regex: search, $options: "i" },
    }).select("username privileges");
    return res.status(200).json(users);
  }

  res.status(405).end();
}
