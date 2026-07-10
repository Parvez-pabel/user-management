import userModel from "../models/userModel.js";

export const register = async (req) => {
  try {
    let { Name, Email, Password } = req.body;
    const newUser = await userModel.create(req.body);
    return { status: "success", data: newUser };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
