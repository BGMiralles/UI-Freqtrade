import { Request, Response } from 'express';
import { BuyTechnical } from '../models/BuyTechnical';

const createBuyTechnical = async (req: Request, res: Response) => {
    try {
        const { buy_signal_id, technical_resources_id } = req.body;

        const buyTechnical = await BuyTechnical.create({
            technical_resources_id,
            buy_signal_id,
        });

        return res.status(201).json({
            success: true,
            message: 'Buy technical created',
            data: buyTechnical,
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Error creating buy technical',
            error: error,
        });
    }
};

const getAllBuyTechnicals = async (req: Request, res: Response) => {
    try {
        const buyTechnicals = await BuyTechnical.find();

        res.json({
            success: true,
            message: 'Buy technicals retrieved',
            data: buyTechnicals,
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving buy technicals',
            error: error, 
        });
    }
};

const deleteBuyTechnical = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        const buyTechnical = await BuyTechnical.findOneBy(id);

        if (!buyTechnical) {
            return res.status(404).json({
                success: false, 
                message: 'Buy technical not found',
            });
        }

        return res.json({ 
            success: true,
            message: 'Buy technical deleted',
            data: buyTechnical, 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error deleting buy technical',
            error: error, 
        });
    }
};

export { deleteBuyTechnical, getAllBuyTechnicals, createBuyTechnical}