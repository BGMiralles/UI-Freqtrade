import { Request, Response } from 'express';
import { SellSignal } from '../models/SellSignal';


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
        const sellSignal = await SellSignal.findOneBy(id);
        if (!sellSignal) {
            return res.status(404).json({
                success: false,
                 message: 'Sell signal not found',
                });
        }
        return res.json(sellSignal);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving sell signal',
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
            });

        return res.status(201).json({
            success: true,
            message: 'Sell signal created',
            data: newSellSignal,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error creating sell signal',
            error: error, 
        });
    }
};

const updateSellSignal = async (req: Request, res: Response) => {
    const { id, parameter_1, parameter_2, sell_technical_id, strategy_id } = req.body;
    try {
        const sellSignal = await SellSignal.update({
            id}, {
            parameter_1,
            parameter_2,
            sell_technical_id,
            strategy_id,
        });
        if (!sellSignal) {
            return res.status(404).json({ 
                success: false,
                message: 'Sell signal not found' });
        }
        return res.json({
            success: true,
            message: 'Sell signal updated successfully',
            data: sellSignal,
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Error updating sell signal', 
            error: error,
        });
    }
};

const deleteSellSignal = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const sellSignal = await SellSignal.findOneBy(id);
        if (!sellSignal) {
            return res.status(404).json({ 
                success: false,
                message: 'Sell signal not found' });
        }
        return res.json({ 
            success: true,
            message: 'Sell signal deleted successfully', 
            data: sellSignal,
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Error deleting sell signal', 
            error: error,
        });
    }
};

export { deleteSellSignal, updateSellSignal, createSellSignal, getSellSignalById, getAllSellSignals }