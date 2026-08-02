import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

//this /register can only handle POST request (use POSTMAN)
router.route("/register").post(
    //multer middleware
    upload.fields([
        {
            name : "avatar",
            maxCount : 1 
        },
        {
            name: "coverImage",
            maxCount :1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secure routes. After next() of verifyJWT, it will go to logoutUser 
router.route("/logout").post(verifyJWT, logoutUser)


export default router