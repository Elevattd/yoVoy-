import { Router } from "express"
import { ROLES_LIST } from "../authorization/roles"
import { getTicket } from '../controllers/ticket'
import { authenticateToken } from "../middlewares/authenticateToken"
import { verifyRoles } from "../middlewares/verifyRoles"


export const router = Router()

router.get('/:id',authenticateToken, verifyRoles(ROLES_LIST.Admin), getTicket)



