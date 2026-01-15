import { UsersController } from "@/controllers/users-controller";
import { Router } from "express";

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.get('/', usersController.create)


export { usersRoute };