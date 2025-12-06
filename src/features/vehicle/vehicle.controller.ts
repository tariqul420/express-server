import { NextFunction, Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const postOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await vehicleServices.postOne();

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: {
        id: 1,
        vehicle_name: "Toyota Camry 2024",
        type: "car",
        registration_number: "ABC-1234",
        daily_rent_price: 50,
        availability_status: "available",
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await vehicleServices.getAll();

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: [
        {
          id: 1,
          vehicle_name: "Toyota Camry 2024",
          type: "car",
          registration_number: "ABC-1234",
          daily_rent_price: 50,
          availability_status: "available",
        },
        {
          id: 2,
          vehicle_name: "Honda Civic 2023",
          type: "car",
          registration_number: "XYZ-5678",
          daily_rent_price: 45,
          availability_status: "available",
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.getOne();

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: {
        id: 2,
        vehicle_name: "Honda Civic 2023",
        type: "car",
        registration_number: "XYZ-5678",
        daily_rent_price: 45,
        availability_status: "available",
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.updateOne();

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: {
        id: 1,
        vehicle_name: "Toyota Camry 2024 Premium",
        type: "car",
        registration_number: "ABC-1234",
        daily_rent_price: 55,
        availability_status: "available",
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleServices.deleteOne();

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
