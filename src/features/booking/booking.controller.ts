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
    const user = req.user;
    const { status } = req.body;

    const result = await bookingServices.updateOne(
      bookingId,
      req.body,
      user?.role,
      user?.userId
    );

    let message = "Booking updated successfully";
    if (status === "cancelled") {
      message = "Booking cancelled successfully";
    } else if (status === "returned") {
      message = "Booking marked as returned. Vehicle is now available";
    }

    res.status(200).json({
      success: true,
      message,
      data: result.rows[0],
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
