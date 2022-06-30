import { Router } from "express"
import {getEvents} from '../controllers/events'
import { handlePaginate } from "../middlewares/paginate"


export const router = Router()

router.get('/', handlePaginate , getEvents)


