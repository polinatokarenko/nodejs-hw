import { Router } from "express";
import { celebrate } from "celebrate";

const userRouter = Router();

userRouter.patch('/users/me/avatar');

export default userRouter;
