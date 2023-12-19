import { Request, Response } from "express";
import { Strategy } from "../models/Strategy";
import { BuySignal } from "../models/BuySignal";
import { SellSignal } from "../models/SellSignal";
import { SellTechnical } from "../models/SellTechnical";
import { BuyTechnical } from "../models/BuyTechnical";

const getAllStrategies = async (req: Request, res: Response) => {
  try {
    const strategies = await Strategy.find();
    if (!strategies) {
      return res.status(404).json({
        success: false,
        message: "Strategies not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Strategies retrieved",
      data: strategies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving strategies",
      error: error,
    });
  }
};

const getStrategyById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOneBy({ id });
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "Strategy retrieved",
      data: strategy,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving strategy",
      error: error,
    });
  }
};
const getMyStrategies = async (req: Request, res: Response) => {
  try {
    const strategy = await Strategy.find({
      select: {
        id: true,
        name: true,
        description: true,
        buy_signal_id: true,
        sell_signal_id: true,
        time_frame_id: true,
      },
      where: {
        user_id: req.token.id,
      },
      relations: ["user", "buySignal", "sellSignal", "timeFrame"],
    });

    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found",
      });
    }

    const niceView = strategy.map((strategy) => {
      return {
        id: strategy.id,
        name: strategy.name,
        description: strategy.description,
        buy_signal_id: strategy.buy_signal_id,
        sell_signal_id: strategy.sell_signal_id,
        time_frame_id: strategy.time_frame_id,
        buy_signal_parameter_1: strategy.buySignal.parameter_1,
        buy_signal_parameter_2: strategy.buySignal.parameter_2,
        buy_signal_created_at: strategy.buySignal.created_at,
        buy_signal_updated_at: strategy.buySignal.updated_at,
        buy_technical_id: strategy.buySignal.buy_technical_id,
        sell_signal_parameter_1: strategy.sellSignal.parameter_1,
        sell_signal_parameter_2: strategy.sellSignal.parameter_2,
        sell_signal_created_at: strategy.sellSignal.created_at,
        sell_signal_updated_at: strategy.sellSignal.updated_at,
        sell_technical_id: strategy.sellSignal.sell_technical_id,
        time_frame: strategy.timeFrame.time_frame,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Strategy retrieved",
      data: niceView,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
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
    buy_technical_resources_id,
    sell_technical_resources_id,
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

    // Crear la señal técnica de compra con las relaciones adecuadas
    const newBuyTechnical = await BuyTechnical.create({
      buy_signal_id: newBuySignal.id,
      technical_resources_id: buy_technical_resources_id,
      buySignal: newBuySignal,
    }).save();

    // Crear la señal de venta
    const newSellSignal = await SellSignal.create({
      parameter_1: parameter_1_sell,
      parameter_2: parameter_2_sell,
      strategy: newStrategy,
    }).save();

    // Crear la señal técnica de venta con las relaciones adecuadas
    const newSellTechnical = await SellTechnical.create({
      sell_signal_id: newSellSignal.id,
      technical_resources_id: sell_technical_resources_id,
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
    parameter_1_buy,
    parameter_2_buy,
    parameter_1_sell,
    parameter_2_sell,
    time_frame_id,
    name,
    description,
    buy_technical_resources_id,
    sell_technical_resources_id,
    id,
  } = req.body;

  try {
    const strategy = await Strategy.findOne({
      where: { user_id: req.token.id, id: id },
      relations: ["user", "buySignal", "sellSignal"],
    });

    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found",
      });
    }
    const newStrategy = { ...strategy}
    if (name) newStrategy.name = name;
    if (description) newStrategy.description = description;
    if (parameter_1_buy) newStrategy.buySignal.parameter_1 = parameter_1_buy;
    if (parameter_2_buy) newStrategy.buySignal.parameter_2 = parameter_2_buy;
    if (parameter_1_sell) newStrategy.sellSignal.parameter_1 = parameter_1_sell;
    if (parameter_2_sell) newStrategy.sellSignal.parameter_2 = parameter_2_sell;
    if (time_frame_id) newStrategy.time_frame_id = time_frame_id;

    await Strategy.update(newStrategy.id, newStrategy); // Actualiza la estrategia principal

    // Guarda las entidades relacionadas
    await newStrategy.buySignal.save();
    await newStrategy.sellSignal.save();

    // Actualiza los técnicos de compra y venta
    if (buy_technical_resources_id) {
      await BuyTechnical.update(
        { id: strategy.buySignal.buy_technical_id ?? 0 },
        { technical_resources_id: buy_technical_resources_id }
      );
    }

    if (sell_technical_resources_id) {
      await SellTechnical.update(
        { id: strategy.sellSignal.sell_technical_id ?? 0 },
        { technical_resources_id: sell_technical_resources_id }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Strategy updated",
      data: newStrategy,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating strategy",
      error: error,
    });
  }
};


const deleteStrategy = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOne({
      where: { id },
      relations: ["buySignal", "sellSignal"],
    });

    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found",
      });
    }

    await Strategy.update(
      { id: id },
      { buy_signal_id: null, sell_signal_id: null }
    );
    if (strategy.buy_signal_id) {
      await BuySignal.update(
        { id: strategy.buy_signal_id },
        { buy_technical_id: null }
      );
    }
    if (strategy.sell_signal_id) {
      await SellSignal.update(
        { id: strategy.sell_signal_id },
        { sell_technical_id: null }
      );
    }
    if (strategy.buySignal.buy_technical_id) {
      await BuyTechnical.delete({ id: strategy.buySignal.buy_technical_id });
    }
    if (strategy.sellSignal.sell_technical_id) {
      await SellTechnical.delete({ id: strategy.sellSignal.sell_technical_id });
    }
    await BuySignal.delete({ id: id });
    await SellSignal.delete({ id: id });
    await Strategy.delete(id);

    return res.status(200).json({
      success: true,
      message: "Strategy deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
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
  getMyStrategies,
};
