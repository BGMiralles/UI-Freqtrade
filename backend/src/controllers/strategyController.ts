import { Request, Response } from "express";
import { Strategy } from "../models/Strategy";
import { BuySignal } from "../models/BuySignal";
import { SellSignal } from "../models/SellSignal";
import { SellTechnical } from "../models/SellTechnical";
import { BuyTechnical } from "../models/BuyTechnical";

const getAllStrategies = async (req: Request, res: Response) => {
  try {
    const strategies = await Strategy.find({
      select: {
        id: true,
        name: true,
        description: true,
        user_id: true,
        buy_signal_id: true,
        sell_signal_id: true,
        time_frame_id: true,
        created_at: true,
        updated_at: true,
      },
      relations: ["BuySignals", "SellSignals", "TimeFrames"],
    });

    const niceView = strategies.map((strate) => ({
      id: strate.id,
      name: strate.name,
      description: strate.description,
      buy_technical_id: Array.isArray(strate.buySignal)
        ? strate.buySignal.map((bt) => bt.technicalResource.name)
        : [],
      sell_technical_id: Array.isArray(strate.sellSignal)
        ? strate.sellSignal.map((bt) => bt.technicalResource.name)
        : [],
      time_frame_id: strate.timeFrame.time_frame,
      created_at: strate.created_at,
      updated_at: strate.updated_at,
    }));
    return res.status(200).json({
      sucess: true,
      message: "Strategies retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving strategies",
      error: error,
    });
  }
};

const getStrategyById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        user_id: true,
        buy_signal_id: true,
        sell_signal_id: true,
        time_frame_id: true,
        created_at: true,
        updated_at: true,
      },
      relations: ["BuySignals", "SellSignals", "TimeFrames"],
    });
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    const niceView = {
      id: strategy.id,
      name: strategy.name,
      description: strategy.description,
      buy_technical_id: Array.isArray(strategy.buySignal)
        ? strategy.buySignal.map((bt) => bt.technicalResource.name)
        : [],
      sell_technical_id: Array.isArray(strategy.sellSignal)
        ? strategy.sellSignal.map((bt) => bt.technicalResource.name)
        : [],
      time_frame_id: strategy.timeFrame.time_frame,
      created_at: strategy.created_at,
      updated_at: strategy.updated_at,
    };
    return res.status(200).json({
      sucess: true,
      message: "Strategy retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving strategy",
      error: error,
    });
  }
};

const createStrategy = async (req: Request, res: Response) => {
  const {
    parameter_1_buy,
    parameter_2_buy,
    parameter_1_sell,
    parameter_2_sell,
    time_frame_id,
    name,
    description,
  } = req.body;

  try {
    // Crear la estrategia
    const newStrategy = await Strategy.create({
      name,
      description,
      user_id: req.token.id,
      time_frame_id,
    }).save();

    // Crear la señal de compra
    const newBuySignal = await BuySignal.create({
      parameter_1: parameter_1_buy,
      parameter_2: parameter_2_buy,
      strategy: newStrategy,
    }).save();

    // Obtener el ID del recurso técnico para la señal de compra (asumiendo que ya existe)
    const existingTechnicalResourceIdBuy = 1; // Reemplaza con el ID correcto del recurso técnico

    // Crear la señal técnica de compra con las relaciones adecuadas
    const newBuyTechnical = await BuyTechnical.create({
      buy_signal_id: newBuySignal.id,
      technical_resources_id: existingTechnicalResourceIdBuy,
      buySignal: newBuySignal,
    }).save();

    // Crear la señal de venta
    const newSellSignal = await SellSignal.create({
      parameter_1: parameter_1_sell,
      parameter_2: parameter_2_sell,
      strategy: newStrategy,
    }).save();

    // Obtener el ID del recurso técnico para la señal de venta (asumiendo que ya existe)
    const existingTechnicalResourceIdSell = 2; // Reemplaza con el ID correcto del recurso técnico

    // Crear la señal técnica de venta con las relaciones adecuadas
    const newSellTechnical = await SellTechnical.create({
      sell_signal_id: newSellSignal.id,
      technical_resources_id: existingTechnicalResourceIdSell,
      sellSignal: newSellSignal,
    }).save();

    // Actualizar las referencias en la estrategia
    newStrategy.buy_signal_id = newBuySignal.id;
    newStrategy.sell_signal_id = newSellSignal.id;
    await newStrategy.save();

    newBuySignal.buy_technical_id = newBuyTechnical.id;
    await newBuySignal.save();
    newSellSignal.sell_technical_id = newSellTechnical.id;
    await newSellSignal.save();

    return res.status(201).json({
      success: true,
      message: "Strategy created",
      data: {
        buySignal: newBuySignal,
        sellSignal: newSellSignal,
        buyTechnical: newBuyTechnical,
        sellTechnical: newSellTechnical,
        strategy: newStrategy,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating strategy",
      error: error,
    });
  }
};


const updateStrategy = async (req: Request, res: Response) => {
  const {
    id,
    name,
    description,
    buy_signal_id,
    sell_signal_id,
    time_frame_id,
  } = req.body;
  try {
    const strategy = await Strategy.findOneBy({
      id,
    });
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    if (name) {
      strategy.name = name;
    }
    if (description) {
      strategy.description = description;
    }
    if (buy_signal_id) {
      strategy.buy_signal_id = buy_signal_id;
    }
    if (sell_signal_id) {
      strategy.sell_signal_id = sell_signal_id;
    }
    if (time_frame_id) {
      strategy.time_frame_id = time_frame_id;
    }
    await strategy.save();
    return res.status(200).json({
      sucess: true,
      message: "Strategy updated",
      data: strategy,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error updating strategy",
      error: error,
    });
  }
};

const deleteStrategy = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOneBy(id);
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "Strategy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error deleting strategy",
      error: error,
    });
  }
};

export {
  deleteStrategy,
  getAllStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
};
