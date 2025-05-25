import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privileges: {
    admin: { type: Boolean, default: false },
    moderator: { type: Boolean, default: false },
    guest: { type: Boolean, default: true },
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
