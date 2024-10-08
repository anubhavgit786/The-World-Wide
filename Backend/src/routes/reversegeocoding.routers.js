import {Router} from "express"
import { useCity } from "../controllers/reversegeocoding.controllers.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const router = Router()

router.route("/:lat/:lng").get(useCity)
router.route("/:lat").get( (req,res) => { throw new Error("Invalid URL" )})
router.route("").get( (req,res) => { throw new Error("Invalid URL" )})

export default router