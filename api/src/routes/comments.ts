import { Router } from "express";
import { getCommentsByEvent } from "../controllers/comments";

export const router = Router();

router.get("/:id", getCommentsByEvent)