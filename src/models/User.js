import mongoose from "mongoose";
import { privilegesShema } from "@/lib/structureShemas.js";

const privilegesFields = {};
privilegesShema.forEach((privilege) => {
  privilegesFields[privilege] = {
    type: Boolean,
  };
});

const privilegesSchema = new mongoose.Schema(privilegesFields, { _id: false });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privileges: privilegesSchema,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
