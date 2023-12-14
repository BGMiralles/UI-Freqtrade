import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { name, nickname,email, password } = req.body

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.json({ mensaje: 'Correo electrónico no válido' });
    }

    const passswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password)) {
      return res.json({ mensaje: 'Password no válido' });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({
      name: name,
      nickname: nickname,
      email: email,
      password: encryptedPassword
    }).save()

    return res.json({
      success: true,
      message: "User created succesfully",
      token: newUser
    })
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "user cant be created",
        error: error
      }
    )
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOneBy(
      {
        email: email
      }
    )

    if (!user) {
      return res.status(400).json(
        {
          success: true,
          message: 'User or password incorrect',
        }
      )
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json(
        {
          success: true,
          message: 'User or password incorrect',
        }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "8h",
      }
    );

    return res.json(
      {
        success: true,
        message: "User logged succesfully",
        token: token
      }
    )
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "users cant be logged",
        error: error
      }
    )
  }
}


const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findOneBy(
      {
        id: req.token.id
      }
    )

    return res.json(
      {
        success: true,
        message: "profile user retrieved",
        data: user
      }
    )
  } catch (error) {
    return res.json(
      {
        success: false,
        message: "user profile cant be retrieved",
        error: error
      }
    )
  }
}

export { register, login, profile }