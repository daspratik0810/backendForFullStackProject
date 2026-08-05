import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, registerUser, updateAccountDetails } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";

const router = Router()

//this /register can only handle POST request (use POSTMAN)
//POST is used to create a brand-new resource, while PATCH is used to partially update an existing resource. 
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

//secure routes. After next() of verifyJWT, it will go to logoutUser. Hence logoutUser can only be routed to the users who are verified(loggedin)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword) // Hence here aswell changeCurrentPassword can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/current-user").get(verifyJWT,getCurrentUser) // Hence here aswell getCurrentUser can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/update-account").patch(verifyJWT,updateAccountDetails) // Hence here aswell updateAccountDetails can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/avatar").patch(verifyJWT,upload.single("avatar"))// Hence here aswell upload.single("avatar") can only be routed to the users who are verified(loggedin), thats why we used verifyJWT, also upload.single("avatar") is used to upload a single file with the name "avatar"
 

export default router