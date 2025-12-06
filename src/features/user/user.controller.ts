import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAll();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const result = await userServices.updateOne(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    await userServices.deleteOne(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  getAll,
  updateOne,
  deleteOne,
};
