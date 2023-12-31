import { Request, Response } from "express";
import { SellSignal } from "../models/SellSignal";
import { SellTechnical } from "../models/SellTechnical";
import { Strategy } from "../models/Strategy";

const getAllSellSignals = async (req: Request, res: Response) => {
  try {
    const sellSignals = await SellSignal.find();
    return res.status(200).json({
      success: true,
      message: "Sell signals retrieved",
      data: sellSignals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Sell signals cant be retrieved",
      error: error,
    });
  }
};

const getSellSignalById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const sellSignal = await SellSignal.findOne({
      where: { id },
      select: {
        id: true,
        parameter_1: true,
        parameter_2: true,
        sell_technical_id: true,
        strategy_id: true,
        created_at: true,
        updated_at: true,
      },
      relations: ["strategy", "sellTechnicals"],
    });
    if (!sellSignal) {
      return res.status(404).json({
        success: false,
        message: "Sell signal not found",
      });
    }
    const niceView = {
      id: sellSignal.id,
      parameter_1: sellSignal.parameter_1,
      parameter_2: sellSignal.parameter_2,
      sell_technical_id: sellSignal.sell_technical_id,
      strategy_name: sellSignal.strategy.name,
      created_at: sellSignal.created_at,
      updated_at: sellSignal.updated_at,
    };
    return res.status(200).json({
      success: true,
      message: "Sell signal retrieved",
      data: niceView,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving sell signal",
      error: error,
    });
  }
};

const createSellSignal = async (req: Request, res: Response) => {
  const { parameter_1, parameter_2, sell_technical_id, strategy_id } = req.body;
  try {
    const newSellSignal = await SellSignal.create({
      parameter_1,
      parameter_2,
      sell_technical_id,
      strategy_id,
    }).save();

    return res.status(201).json({
      success: true,
      message: "Sell signal created",
      data: newSellSignal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating sell signal",
      error: error,
    });
  }
};

const updateSellSignal = async (req: Request, res: Response) => {
  const { id, parameter_1, parameter_2, sell_technical_id, strategy_id } =
    req.body;
  try {
    const sellSignal = await SellSignal.update(
      {
        id,
      },
      {
        parameter_1,
        parameter_2,
        sell_technical_id,
        strategy_id,
      }
    );
    if (!sellSignal) {
      return res.status(404).json({
        success: false,
        message: "Sell signal not found",
      });
    }
    return res.json({
      success: true,
      message: "Sell signal updated successfully",
      data: sellSignal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating sell signal",
      error: error,
    });
  }
};

const deleteSellSignal = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const sellSignal = await SellSignal.findOne({
      where: { id },
      relations: ["sellTechnicals"],
    });
    if (!sellSignal) {
      return res.status(404).json({
        success: false,
        message: "Sell signal not found",
      });
    }
    await SellSignal.update(
      { id: id },
      { sell_technical_id: null, strategy_id: null }
    );
    if (sellSignal.sell_technical_id) {
      await SellTechnical.update(
        { id: sellSignal.sell_technical_id },
        { sell_signal_id: null, technical_resources_id: null }
      );
    }
    if (sellSignal.sell_technical_id) {
      await SellTechnical.delete({ id: sellSignal.sell_technical_id });
    }
    await Strategy.update({ sell_signal_id: id }, { sell_signal_id: null });
    await SellSignal.delete({ id });
    return res.json({
      success: true,
      message: "Sell signal deleted successfully",
      data: sellSignal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting sell signal",
      error: error,
    });
  }
};

export {
  deleteSellSignal,
  updateSellSignal,
  createSellSignal,
  getSellSignalById,
  getAllSellSignals,
};
