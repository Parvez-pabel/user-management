import { deleteUser, getAll, getById, login, profileDetails, register, updateUser } from "../services/userServices.js";

export const userRegister = async (req, res) => {
  try {
    const result = await register(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }
    const result = await login(Email, Password);
    if (result.status === "success") {
      return res.status(200).json({
        status: "The user is successfully logged In",
        Token: result.token,
      });
    } else {
      return res.status(401).json({
        status: "fail",
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userProfile = async (req, res) => {
  try {
    const result = await profileDetails(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const allUsers = async (req, res) => {
  try {
    const result = await getAll(req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userGetById = async (req, res) => {
  try {
    const result = await getById(req,res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updatedUserInfo = async (req, res) => {
  try {
    const result = await updateUser(req,res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const userDelete = async (req, res) => {
  try {
    const result = await deleteUser(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};