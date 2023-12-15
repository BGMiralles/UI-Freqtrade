import { Request, Response } from "express";
import { User } from "../models/User";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users retrieved",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Users cant be retrieved",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const userToRemove = await User.findOneBy({
      id,
    });
    if (!userToRemove) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.remove(userToRemove);

    return res.status(200).json({
      success: true,
      message: "User deleted",
      data: userToRemove,
    });
  } catch (error) {
    return res.status(500).json({
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
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or role",
      });
    }

    const userToUpdate = await User.findOneBy({
      id,
    });
    if (!userToUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    userToUpdate.role = role;
    await userToUpdate.save();

    return res.status(200).json({
      success: true,
      message: "User role updated",
      data: userToUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cant be updated",
      error: error,
    });
  }
};

export { getAllUsers, deleteUser, updateUserRole };
