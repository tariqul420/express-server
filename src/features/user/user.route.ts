import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

// routes
router.get("/", userControllers.getAll);
router.put("/:userId", userControllers.updateOne);
router.delete("/:userId", userControllers.deleteOne);

export const userRouters = router;
