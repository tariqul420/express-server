import { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { userControllers } from "./user.controller";

const router = Router();

// routes
router.get("/", auth("admin"), userControllers.getAll);
router.put("/:userId", auth("admin", "customer"), userControllers.updateOne);
router.delete("/:userId", auth("admin"), userControllers.deleteOne);

export const userRouters = router;
