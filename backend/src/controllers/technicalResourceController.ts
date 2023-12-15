import { Request, Response } from "express";
import { TechnicalResource } from "../models/TechnicalResource";

const createTechnicalResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Invalid technical resource",
      });
    }

    const createTechnicalResource = await TechnicalResource.create({
      name,
      description,
    }).save();

    return res.status(200).json({
      success: true,
      message: "Technical resource created",
      data: createTechnicalResource,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Technical resource cant be created",
      error: error,
    });
  }
};

const deleteTechnicalResource = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid technical resource ID",
      });
    }

    const technicalResourceToRemove = await TechnicalResource.findOneBy({
      id,
    });
    if (!technicalResourceToRemove) {
      return res.status(404).json({
        success: false,
        message: "Technical resource not found",
      });
    }

    await TechnicalResource.remove(technicalResourceToRemove);

    return res.status(200).json({
      success: true,
      message: "Technical resource deleted",
      data: technicalResourceToRemove,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Technical resource cant be deleted",
      error: error,
    });
  }
};

const updateTechnicalResource = async (req: Request, res: Response) => {
  try {
    const { id, name, description } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid technical resource",
      });
    }

    const technicalResourceToUpdate = await TechnicalResource.findOneBy({
      id,
    });
    if (!technicalResourceToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Technical resource not found",
      });
    }

    if (name) {
      technicalResourceToUpdate.name = name;
    }
    if (description) {
      technicalResourceToUpdate.description = description;
    }

    await technicalResourceToUpdate.save();

    return res.status(200).json({
      success: true,
      message: "Technical resource updated",
      data: technicalResourceToUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Technical resource cant be updated",
      error: error,
    });
  }
};

const getAllTechnicalResources = async (req: Request, res: Response) => {
  try {
    const technicalResources = await TechnicalResource.find();
    return res.status(200).json({
      success: true,
      message: "Technical resources retrieved",
      data: technicalResources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Technical resources cant be retrieved",
      error: error,
    });
  }
};

export {
  createTechnicalResource,
  deleteTechnicalResource,
  updateTechnicalResource,
  getAllTechnicalResources,
};
