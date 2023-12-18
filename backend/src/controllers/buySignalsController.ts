import { Request, Response } from "express";
import { BuySignal } from "../models/BuySignal";
import { BuyTechnical } from "../models/BuyTechnical";
import { Strategy } from "../models/Strategy";

const getAllBuySignals = async (req: Request, res: Response) => {
  try {
    const buySignals = await BuySignal.find();

    return res.status(200).json({
      success: true,
      message: "Buy signals retrieved",
      data: buySignals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Buy signals can't be retrieved",
      error: error,
    });
  }
};

const getBuySignalById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const buySignal = await BuySignal.findOne({
      where: { id },
      select: {
        id: true,
        parameter_1: true,
        parameter_2: true,
        buy_technical_id: true,
        strategy_id: true,
        created_at: true,
        updated_at: true,
      },
      relations: ["strategy", "buyTechnicals"],
    });
    if (!buySignal) {
      return res.status(404).json({
        success: false,
        message: "Buy signal not found",
      });
    }
    const niceView = {
      id: buySignal.id,
      parameter_1: buySignal.parameter_1,
      parameter_2: buySignal.parameter_2,
      buy_technical_id: buySignal.buy_technical_id,
      strategy_name: buySignal.strategy.name,
      created_at: buySignal.created_at,
      updated_at: buySignal.updated_at,
    };
    return res.status(200).json({
      success: true,
      message: "Buy signal retrieved",
      data: niceView,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving buy signal",
      error: error,
    });
  }
};

const createBuySignal = async (req: Request, res: Response) => {
  const {
    parameter_1,
    parameter_2,
    buy_technical_id,
    strategy_id,
    technical_resources_id,
  } = req.body;
  try {
    const newBuySignal = await BuySignal.create({
      parameter_1,
      parameter_2,
      buy_technical_id,
      strategy_id,
    }).save();

    return res.status(201).json({
      success: true,
      message: "Buy signal created",
      data: newBuySignal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating buy signal",
      error: error,
    });
  }
};

const updateBuySignal = async (req: Request, res: Response) => {
  const { id, parameter_1, parameter_2, buy_technical_id, strategy_id } =
    req.body;
  try {
    const buySignal = await BuySignal.update(
      {
        id,
      },
      {
        parameter_1,
        parameter_2,
        buy_technical_id,
        strategy_id,
      }
    );
    if (!buySignal) {
      return res.status(404).json({
        success: false,
        message: "Buy signal not found",
      });
    }
    return res.json({
      success: true,
      message: "Buy signal updated successfully",
      data: buySignal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating buy signal",
      error: error,
    });
  }
};

const deleteBuySignal = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const buySignal = await BuySignal.findOne({
      where: { id },
      relations: ["buyTechnicals"],
    });
    if (!buySignal) {
      return res.status(404).json({
        success: false,
        message: "Buy signal not found",
      });
    }
    await BuySignal.update(
      { id: id },
      { buy_technical_id: null, strategy_id: null }
    );
    if (buySignal.buy_technical_id) {
      await BuyTechnical.update(
        { id: buySignal.buy_technical_id },
        { buy_signal_id: null, technical_resources_id: null }
      );
    }
    if (buySignal.buy_technical_id) {
      await BuyTechnical.delete({ id: buySignal.buy_technical_id });
    }
    await Strategy.update({ buy_signal_id: id }, { buy_signal_id: null });
    await BuySignal.delete({ id });
    return res.json({
      success: true,
      message: "Buy signal deleted successfully",
      data: buySignal,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting buy signal",
      error: error,
    });
  }
};

export {
  deleteBuySignal,
  updateBuySignal,
  createBuySignal,
  getBuySignalById,
  getAllBuySignals,
};
