// VVI FLOW - user.routes.js ---> user.controller.js
//whatever methods and functions are set to be called after a route in user.routes.js, it is defined in  user.controller.js


import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

//this /register can only handle POST request (use POSTMAN)
//POST is used to create a brand-new resource, while PATCH is used to partially update an existing resource. 
router.route("/register").post(
    //multer middleware
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secure routes. After next() of verifyJWT, it will go to logoutUser. Hence logoutUser can only be routed to the users who are verified(loggedin)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword) // Hence here aswell changeCurrentPassword can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/current-user").get(verifyJWT, getCurrentUser) // Hence here aswell getCurrentUser can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/update-account").patch(verifyJWT, updateAccountDetails) // Hence here aswell updateAccountDetails can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)// Hence here aswell updateUserAvatar can only be routed to the users who are verified(loggedin), thats why we used verifyJWT, also upload.single("avatar") is used to upload a single file with the name "avatar"
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)// Hence here aswell updateUserCoverImage can only be routed to the users who are verified(loggedin), thats why we used verifyJWT, also upload.single("/coverImage") is used to upload a single file with the name "coverImage"
router.route("/c/:username").get(verifyJWT, getUserChannelProfile) // Hence here aswell getUserChannelProfile can only be routed to the users who are verified(loggedin), thats why we used verifyJWT
router.route("/history").get(verifyJWT, getWatchHistory) // Hence here aswell getWatchHistory can only be routed to the users who are verified(loggedin), thats why we used verifyJWT


export default router