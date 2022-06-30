import { Router } from "express";
import { ROLES_LIST } from "../authorization/roles";
import { postCategory, getCategory, putCategory, deleteCategory } from "../controllers/category"
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";

export const router = Router()

router.post("/",authenticateToken,verifyRoles(ROLES_LIST.Admin), postCategory)
router.get("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), getCategory)
router.put("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), putCategory)
router.delete("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), deleteCategory)