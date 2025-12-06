import { NextFunction, Request, Response } from "express";
import { bookingServices } from "./booking.service";

const postOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingServices.postOne(req.body);

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const result = await bookingServices.getAll(user?.role, user?.userId);

    const message =
      user?.role === "customer"
        ? "Your bookings retrieved successfully"
        : "Bookings retrieved successfully";

    res.status(200).json({
      success: true,
      message,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;

    const result = await bookingServices.updateOne(bookingId, req.body);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const bookingController = {
  postOne,
  getAll,
  updateOne,
};
