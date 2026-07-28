import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

//this /register can only handle POST request (use POSTMAN)
router.route("/register").post(registerUser)

export default router