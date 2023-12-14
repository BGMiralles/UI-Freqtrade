import { Request, Response } from 'express';
import { BuySignal } from '../models/BuySignal';


export const getAllBuySignals = async (req: Request, res: Response) => {
    try {
        const buySignals = await BuySignal.find();
        return res.json({
            success: true,
            message: "Buy signals retrieved",
            data: buySignals,
          });
    } catch (error) {
        return res.json({
            success: false,
            message: "Buy signals cant be retrieved",
            error: error,
          });
    }
};

export const getBuySignalById = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const buySignal = await BuySignal.findOneBy(id);
        if (!buySignal) {
            return res.status(404).json({
                success: false,
                 message: 'Buy signal not found',
                });
        }
        return res.json(buySignal);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving buy signal',
            error: error,
         });
    }
};

export const createBuySignal = async (req: Request, res: Response) => {
    const { parameter_1, parameter_2, buy_technical_id, strategy_id } = req.body;
    try {
        const newBuySignal = await BuySignal.create({
             parameter_1, 
             parameter_2,
             buy_technical_id,
             strategy_id,
            });

        return res.status(201).json({
            success: true,
            message: 'Buy signal created',
            data: newBuySignal,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error creating buy signal',
            error: error, 
        });
    }
};

export const updateBuySignal = async (req: Request, res: Response) => {
    const { id, parameter_1, parameter_2, buy_technical_id, strategy_id } = req.body;
    try {
        const buySignal = await BuySignal.update({
            id}, {
            parameter_1,
            parameter_2,
            buy_technical_id,
            strategy_id,
        });
        if (!buySignal) {
            return res.status(404).json({ 
                success: false,
                message: 'Buy_signal not found' });
        }
        return res.json({
            success: true,
            message: 'Buy signal updated successfully',
            data: buySignal,
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Error updating buy signal', 
            error: error,
        });
    }
};

// Delete an existing buy_signal
export const deleteBuySignal = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const buySignal = await BuySignal.findOneBy(id);
        if (!buySignal) {
            return res.status(404).json({ 
                success: false,
                message: 'Buy signal not found' });
        }
        return res.json({ 
            success: true,
            message: 'Buy_signal deleted successfully', 
            data: buySignal,
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Error deleting buy signal', 
            error: error,
        });
    }
};
