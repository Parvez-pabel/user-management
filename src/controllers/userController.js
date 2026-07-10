import { register } from "../services/userServices.js";

export const userRegister = async (req, res) => {
  try {
    const result = await register(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};