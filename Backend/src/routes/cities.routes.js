import {Router} from "express";
import { addCity } from "../controllers/addcity.controllers.js";
import { allCity } from "../controllers/allcities.controllers.js";
import { oneCity } from "../controllers/onecity.controllers.js";
import { deleteCity } from "../controllers/deletecity.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/addCity").post(verifyJWT,addCity)
router.route("/allCities").get(allCity)
router.route("/oneCity/:id").get(oneCity)
router.route("/deleteCity/:id").post(verifyJWT , deleteCity)

export default router