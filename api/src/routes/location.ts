import { Router } from "express"
import { ROLES_LIST } from "../authorization/roles"
import { getLocation, postLocation, putLocation } from "../controllers/location"
import { authenticateToken } from "../middlewares/authenticateToken"
import { verifyRoles } from "../middlewares/verifyRoles"

export const router = Router()

router.get('/:id', authenticateToken, verifyRoles(ROLES_LIST.Admin) , getLocation)
router.post("/", authenticateToken, verifyRoles(ROLES_LIST.Admin) , postLocation)
router.put("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), putLocation)