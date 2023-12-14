import { Request, Response } from 'express';
import { TimeFrame } from '../models/TimeFrame';
import { time } from 'console';

const getAllTimeFrames = async (req: Request, res: Response) => {
    try {
        const timeFrames = await TimeFrame.find();
        return res.json(timeFrames);
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error retrieving time frames', 
            error: error 
        });
    }
};

const createTimeFrame = async (req: Request, res: Response) => {
    try {
      const { time_frame } = req.body;

      if (!time_frame) {
        return res.json({
          success: false,
          message: "Invalid time frame",
        });
      }
  
      const createTimeFrame = await TimeFrame.create({
        time_frame,
      });
  
      return res.json({
        success: true,
        message: "Time frame created",
        data: createTimeFrame,
      });

    } catch (error) {
      return res.json({
        success: false,
        message: "Time frame cant be created",
        error: error,
      });
    }
  };

const deleteTimeFrame = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Invalid time frame ID' });
        }
        const timeFrameToRemove = await TimeFrame.findOneBy({ 
            id 
        });
        if (!timeFrameToRemove) {
            return res.status(400).json({ message: 'Time frame not found' });
        }
        await TimeFrame.remove(timeFrameToRemove);

        return res.json({ 
            message: 'Time frame deleted successfully' 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error deleting time frame',
            error: error, });
    }
};
// Export all CRUD functions
export {
    getAllTimeFrames,
    createTimeFrame,
    deleteTimeFrame,
};
