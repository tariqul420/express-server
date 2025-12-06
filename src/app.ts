import express, { Application, NextFunction, Request, Response } from "express";
import db from "./config/db";
import { authRoutes } from "./features/auth/auth.route";
import { vehicleRouters } from "./features/vehicle/vehicle.route";
import { errorHandler } from "./middlewares/error.middleware";

// app initialization
const app: Application = express();
app.use(express.json());

// Initialize database tables
db()
  .then(() => {
    console.log("Database tables initialized successfully");
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRouters);

// unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.status = 404;

  next(error);
});

// Global error handler
app.use(errorHandler);

export default app;
