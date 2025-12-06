import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

// routes
router.post("/", bookingController.postOne);
router.get("/", bookingController.getAll);
router.put("/:bookingId", bookingController.updateOne);

export const bookingRouters = router;
