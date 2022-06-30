import { Router } from "express";
import { ROLES_LIST } from "../authorization/roles";
import { deleteOrganization, postOrganization, getOrganization, putOrganization, getEvents } from "../controllers/organization"
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";

export const router = Router();

router.get("/events", authenticateToken, verifyRoles(ROLES_LIST.Organization), getEvents)
router.post("/",authenticateToken, postOrganization)
router.delete("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), deleteOrganization)
router.get("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), getOrganization)
router.put("/:id", authenticateToken, verifyRoles(ROLES_LIST.Admin), putOrganization)

