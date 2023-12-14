import { Request, Response } from 'express';
import { User } from '../models/User';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(
            {
              success: true,
              message: "users retrieved",
              data: users
            }
          )
    } catch (error) {
        return res.json(
            {
              success: false,
              message: "users cant be retrieved",
              error: error
            }
          )
        }
    }

    const deleteUser = async (req: Request, res: Response) => {
        try {
          const id = req.body.id;
      
          const userToRemove = await User.findOneBy({
            id,
          });
          if (userToRemove) {
            await User.remove(userToRemove);
          }
      
          return res.json({
            success: true,
            message: "User deleted",
            data: userToRemove,
          });
        } catch (error) {
          return res.json({
            success: false,
            message: "User cant by deleted",
            error: error,
          });
        }
      };

export { getAllUsers, deleteUser }