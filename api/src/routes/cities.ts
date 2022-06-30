import { Router } from "express";
import { getCities } from "../controllers/cities";
import { handlePaginate } from "../middlewares/paginate";

export const router = Router();

router.get("/", handlePaginate, getCities)