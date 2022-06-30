import { Router } from "express";
import { getEventById, postEvent, deleteEvent, putEvent, getEventByDate } from "../controllers/event";
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";
import { ROLES_LIST } from "../authorization/roles";



export const router = Router();

router.get("/:id", getEventById)
router.post("/",authenticateToken,verifyRoles(ROLES_LIST.Organization), postEvent)
router.delete("/:id",authenticateToken,verifyRoles(ROLES_LIST.Organization), deleteEvent)
router.put("/:id",authenticateToken,verifyRoles(ROLES_LIST.Organization), putEvent)
router.get("/date/:id",authenticateToken, verifyRoles(ROLES_LIST.Admin), getEventByDate)