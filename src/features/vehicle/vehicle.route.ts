import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

// routes
router.post("/", auth("admin"), vehicleControllers.postOne);
router.get("/", vehicleControllers.getAll);
router.get("/:vehicleId", vehicleControllers.getOne);
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateOne);
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteOne);

export const vehicleRouters = router;
