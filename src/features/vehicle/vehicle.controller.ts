import { NextFunction, Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const postOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await vehicleServices.postOne(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await vehicleServices.getAll();

    if (result.rowCount === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.getOne(vehicleId);

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.updateOne(vehicleId, req.body);

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId } = req.params;

    await vehicleServices.deleteOne(vehicleId);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const vehicleControllers = {
  postOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
