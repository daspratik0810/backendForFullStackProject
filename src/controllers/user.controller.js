import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
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
// ---------------------------------------------------------------------------------------------
    //get users details from frontend
    const {fullName, email, username, password} = req.body
    console.log("email",email);

    //validation - did user sent empty username or email ? or etc etc
    //this if condition checks whether given fiels are empty or not, if yes then throw error
    if(
        [fullName, email, username, password].some( (field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

     //check if user already exists : username or email
     //we use findOne method, here it finds the user which has matching email/username 
    const existedUser = User.findOne({
        $or :  [{ email }, { username }]  //it checks either email or username already is present or not in database
    })
    
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists, please login !!")
    }

})

export {registerUser}

