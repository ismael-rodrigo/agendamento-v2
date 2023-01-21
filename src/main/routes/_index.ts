import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { scheduleRoutes } from "./schedule.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/users" , userRoutes)
routes.use("/auth" , authRoutes)
routes.use("/schedule" , scheduleRoutes)

export {routes}