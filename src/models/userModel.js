import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const usersSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
(usersSchema.pre("save", async function () {
  if (!this.isModified("Password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.Password = await bcrypt.hash(this.Password, salt);
  } catch (error) {
    throw error;
  }
}),
  (usersSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
  }));

export default mongoose.model("users", usersSchema);
