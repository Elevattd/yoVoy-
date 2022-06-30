import { Router } from "express"
import { ROLES_LIST } from "../authorization/roles"
import { getTickets } from '../controllers/tickets'
import { authenticateToken } from "../middlewares/authenticateToken"
import { handlePaginate } from "../middlewares/paginate"
import { verifyRoles } from "../middlewares/verifyRoles"


export const router = Router()

router.get('/',authenticateToken, verifyRoles(ROLES_LIST.Admin), handlePaginate, getTickets)


