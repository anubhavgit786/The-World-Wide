import {Router} from "express";
import { addCity } from "../controllers/addcity.controllers.js";
import { allCity } from "../controllers/allcities.controllers.js";
import { oneCity } from "../controllers/onecity.controllers.js";
const router = Router()

router.route("/addCity").post(addCity)
router.route("/allCities").get(allCity)
router.route("/oneCity/:id").get(oneCity)

export default router