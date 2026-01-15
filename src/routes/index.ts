import { Router } from "express";
import { usersRoute } from "@/routes/users-route";

const routes = Router();

routes.use("/users", usersRoute);

export { routes };