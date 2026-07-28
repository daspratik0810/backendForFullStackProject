import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res) => {
    console.log("registerUser called");  //we will see this message in terminal if POSTMAN or anyone access it, make sure the visibility is public in PORT tab in the bottom here
    //we decide using models ( user.model.js, video.models.js)
    //data we get via POSTMAN (for testing)
    //get users details from frontend
    //validation - did user sent empty username or email ? or etc etc
    //check if user already exists : username or email
    //check for images and avatar 
    //upload them to cloudinary, avatar check
    // WORK FLOW UNTIL NOW :user sends data, we validate for account creation, if not then make account,, we take image and upload it to cloudinary, image comes back from cloudinary
    //  create user object - create entry in DB
    // remove password and refresh token field from response
    //check user creation
    //return res




})

export {registerUser}

