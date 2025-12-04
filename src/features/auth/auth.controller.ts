import { NextFunction, Request, Response } from "express";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = {};

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "01712345678",
        role: "customer",
      },
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = {};

    res.status(201).json({
      success: true,
      message: "Login successful",
      data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          role: "customer",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signup,
  signin,
};
