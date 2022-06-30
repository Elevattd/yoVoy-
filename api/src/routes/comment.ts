import { Router } from "express";
import { postComment } from "../controllers/comment";
import { authenticateToken } from "../middlewares/authenticateToken";

export const router = Router();

router.post("/:id", authenticateToken, postComment)