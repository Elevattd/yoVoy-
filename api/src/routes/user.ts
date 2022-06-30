import { Router } from "express";
import { ROLES_LIST } from "../authorization/roles";
import { getFavorites, postFavorite, getTickets, putUserRole, deleteFavorite, getTicket, resetPassword, getUserProfile, getFavorite, getRequests, getRequest} from "../controllers/user"
import { authenticateToken } from "../middlewares/authenticateToken";
import { handlePaginate } from "../middlewares/paginate";
import { verifyRoles } from "../middlewares/verifyRoles";


export const router = Router();

router.get("/favorites", authenticateToken, getFavorites)
router.get("/favorites/:eventId", authenticateToken, getFavorite)
router.post("/favorite/:eventId", authenticateToken, postFavorite)
router.delete("/favorites/:eventId", authenticateToken, deleteFavorite)
router.get("/tickets",authenticateToken, getTickets)
router.get("/ticket/:ticketId", authenticateToken, getTicket)
router.put("/role", authenticateToken, verifyRoles(ROLES_LIST.Admin), putUserRole)
router.put("/resetPassword", authenticateToken, verifyRoles(ROLES_LIST.Admin), resetPassword)
router.get("/information", authenticateToken, getUserProfile)
router.get("/requests", authenticateToken,handlePaginate ,getRequests)
router.get("/request/:id", authenticateToken, getRequest)
