import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

// routes
router.post("/", vehicleControllers.postOne);
router.get("/", vehicleControllers.getAll);
router.get("/:vehicleId", vehicleControllers.getOne);
router.put("/:vehicleId", vehicleControllers.updateOne);
router.post("/:vehicleId", vehicleControllers.deleteOne);

export const vehicleRouters = router;
