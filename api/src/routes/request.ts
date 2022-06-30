import { Router } from "express"
import { ROLES_LIST } from "../authorization/roles"
import { postRequest, putRequest, getRequest } from "../controllers/request"
import { authenticateToken } from "../middlewares/authenticateToken"
import { verifyRoles } from "../middlewares/verifyRoles"


export const router = Router()

router.get("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), getRequest)
router.post('/', authenticateToken, postRequest)
router.put("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), putRequest)