import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { name, nickname, email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const passswordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);

    if (!name || !nickname) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const newUser = await User.create({
      name: name,
      nickname: nickname,
      email: email,
      password: encryptedPassword,
    }).save();

    return res.status(200).json({
      success: true,
      message: "User created succesfully",
      token: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cant be created",
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User or password incorrect",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: true,
        message: "User or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User logged succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "users cant be logged",
      error: error,
    });
  }
};

const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.token.id },
      relations: ["role"],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const niceView = {
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      role: user.role.role,
    };

    return res.json({
      success: true,
      message: "profile user retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "user profile cant be retrieved",
      error: error,
    });
  }
};

const updateUser = async (req: any, res: Response) => {
  try {
    const { name, email, nickname } = req.body;

    if (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email) || email < 0 || email > 100) {
        return res.status(400).json({ message: "Invalid email" });
      }
    }

    const checkEmailExists = async (req: Request, res: Response) => {
      try {
        const { email } = req.body;
        const existingUser = await User.findOne(email);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        return res.json({
          success: true,
          message: "Email does not exist",
        });
      } catch (error) {
        return res.json({
          success: false,
          message: "Error checking email existence",
          error: error,
        });
      }
    };

    const updateUser = await User.update(
      {
        id: req.token.id,
      },
      {
        name,
        nickname,
        email,
      }
    );

    return res.json({
      success: true,
      message: "user updated",
      data: updateUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "user cant by updated",
      error: error,
    });
  }
};

export { register, login, profile, updateUser };
