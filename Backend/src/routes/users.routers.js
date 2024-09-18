import { registerUser } from "../controllers/registerUser.controllers.js"
import {Router} from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import { loginUser } from "../controllers/loginUser.controllers.js"
import { logoutUser } from "../controllers/logoutUser.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { refreshAccessToken } from "../controllers/refreshaccesstoken.controllers.js"

const router = Router()

router.route("/register").post(
    upload.single('picture'),
    
    registerUser)
    
router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post( verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


export default router