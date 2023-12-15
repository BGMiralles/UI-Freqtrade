import { Request, Response } from "express";
import { BuyTechnical } from "../models/BuyTechnical";
import { SellTechnical } from "../models/SellTechnical";

const createSellTechnical = async (req: Request, res: Response) => {
  try {
    const { sell_signal_id, technical_resources_id } = req.body;

    const sellTechnical = await SellTechnical.create({
      technical_resources_id,
      sell_signal_id,
    });

    return res.status(201).json({
      success: true,
      message: "Sell technical created",
      data: sellTechnical,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating sell technical",
      error: error,
    });
  }
};

const getAllSellTechnicals = async (req: Request, res: Response) => {
  try {
    const sellTechnicals = await SellTechnical.find();

    res.json({
      success: true,
      message: "Sell technicals retrieved",
      data: sellTechnicals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving sell technicals",
      error: error,
    });
  }
};

const deleteSellTechnical = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const sellTechnical = await SellTechnical.findOneBy(id);

    if (!sellTechnical) {
      return res.status(404).json({
        success: false,
        message: "Sell technical not found",
      });
    }

    return res.json({
      success: true,
      message: "Sell technical deleted",
      data: sellTechnical,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting sell technical",
      error: error,
    });
  }
};

export { deleteSellTechnical, getAllSellTechnicals, createSellTechnical };
