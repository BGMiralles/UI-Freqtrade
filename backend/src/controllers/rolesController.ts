import { Request, Response } from "express";
import { Role } from "../models/Role";

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({
      status: true,
      message: "Roles retrieved",
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error retrieving roles",
      error: error,
    });
  }
};

const getRoleById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const role = await Role.findOneBy(id);
    if (!role) {
      return res.status(404).json({
        status: false,
        message: "Role not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Role retrieved",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error retrieving role",
      error: error,
    });
  }
};

const createRole = async (req: Request, res: Response) => {
  const { role } = req.body;
  try {
    const newRole = await Role.create({
      role,
    });
    return res.status(201).json({
      status: true,
      message: "Role created successfully",
      data: newRole,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error creating role",
      error: error,
    });
  }
};

const updateRole = async (req: Request, res: Response) => {
  const { role, id } = req.body;
  try {
    const roleToUpdate = await Role.findOneBy({
      id,
    });
    if (!roleToUpdate) {
      return res.status(404).json({
        status: false,
        message: "Role not found",
      });
    }
    if (role) {
      roleToUpdate.role = role;
    }
    await roleToUpdate.save();
    return res.status(200).json({
      status: true,
      message: "Role updated successfully",
      data: roleToUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error updating role",
      error: error,
    });
  }
};

const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const role = await Role.findOneBy(id);
    if (!role) {
      return res.status(404).json({
        status: false,
        message: "Role not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Role deleted successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error deleting role",
      error: error,
    });
  }
};

export { deleteRole, getRoleById, getRoles, createRole, updateRole };
