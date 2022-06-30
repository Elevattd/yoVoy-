import { Router } from "express"
import { getLocations } from "../controllers/locations"
import { handlePaginate } from "../middlewares/paginate"

export const router = Router()

router.get('/',handlePaginate, getLocations)