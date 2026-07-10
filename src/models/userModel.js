import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
  usersSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.Password = await bcrypt.hash(this.Password, salt);
      next();
    } catch (error) {
      return next();
    }
  }),
  (usersSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
  }),
);

export default mongoose.model("users", usersSchema);
