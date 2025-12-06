import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { bookingController } from "./booking.controller";

const router = Router();

// routes
router.post("/", auth("admin", "customer"), bookingController.postOne);
router.get("/", auth("admin", "customer"), bookingController.getAll);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingController.updateOne
);

export const bookingRouters = router;
