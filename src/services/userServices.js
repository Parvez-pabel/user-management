import { generateToken } from "../helpers/tokenHelpers.js";
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

export const login = async (Email, Password) => {
  try {
    const user = await userModel.findOne({ Email });
    if (user && (await user.comparePassword(Password))) {
      const token = generateToken(user._id);
      return { status: "success", token: token };
    }
    return { status: "fail", data: "Unauthorized Access" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const profileDetails = async (req, res) => {
  try {
    const userID = req.user.id;
    const userDetails = await userModel.findById(userID).select("-Password");
    return res.status(200).json({
      status: "success",
      message: "Success",
      userDetails: userDetails,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAll = async (req, res) => {
  try {
    const users = await userModel.find().select("-Password");
    return { status: "success", data: users };
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await userModel.findById(userID).select("-Password");
    if (!user) {
      return { status: "fail", data: "Resource Not Found" };
    }
    return { status: "success", data: user };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const updatedUser = await userModel
      .findByIdAndUpdate(userID, { Name: req.body.Name }, { new: true })
      .select("-Password");
    return { status: "success", data: updatedUser };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteUser = async (req) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res.status(404).json({
        status: "fail",
        message: "Resource Not Found",
      });
    }
    await userModel.findByIdAndDelete(userID);
    return { status: "success" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
