import { Request, Response } from "express";
import { User } from "../models/User";
import { TimeFrame } from "../models/TimeFrame";
import { TechnicalResource } from "../models/TechnicalResource";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json({
      success: true,
      message: "users retrieved",
      data: users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "users cant be retrieved",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const userToRemove = await User.findOneBy({
      id,
    });
    if (!userToRemove) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    await User.remove(userToRemove);

    return res.json({
      success: true,
      message: "User deleted",
      data: userToRemove,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User cant be deleted",
      error: error,
    });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body;

    if (!id || !role) {
      return res.json({
        success: false,
        message: "Invalid user ID or role",
      });
    }

    const userToUpdate = await User.findOneBy({
      id,
    });
    if (!userToUpdate) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    userToUpdate.role = role;
    await userToUpdate.save();

    return res.json({
      success: true,
      message: "User role updated",
      data: userToUpdate,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User role cant be updated",
      error: error,
    });
  }
};

const createTimeFrame = async (req: Request, res: Response) => {
  try {
    const { time_frame } = req.body;

    if (!time_frame) {
      return res.json({
        success: false,
        message: "Invalid time frame",
      });
    }

    const createTimeFrame = await TimeFrame.create({
      time_frame,
    });

    return res.json({
      success: true,
      message: "Time frame created",
      data: createTimeFrame,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Time frame cant be created",
      error: error,
    });
  }
};



export {
  getAllUsers,
  deleteUser,
  updateUserRole,
  createTimeFrame,
};
