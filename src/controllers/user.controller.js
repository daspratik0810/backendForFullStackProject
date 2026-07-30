import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//we use asyncHandler(or simply async await) because in server it takes time to do the following changes and checks
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
        [fullName, email, username, password].some( (field) => field ?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

     //check if user already exists : username or email
     //we use findOne method, here it finds the user which has matching email/username 
    const existedUser = await User.findOne({
        $or :  [{ email }, { username }]  //it checks either email or username already is present or not in database
    })
    
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists, please login !!")
    }

    //console.log(req.files); it is to check the files/images that we upload
    

    //check for images and avatar
    //user.routes.js
    const avatarLocalPath = req.files ?.avatar[0] ?.path
    //const coverImageLocalPath = req.files ?.coverImage[0] ?.path

    //a check for the empty and if the coverImage is array or not
    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }


    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //upload them to cloudinary, avatar check
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    //  create user object - create entry in DB
   const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    //check user creation
    //mongoDB creates automatically "_id" with every successful entry/user, so we are finding it if user is successfully got registered as user or not
    const createdUser = await User.findById(user._id).select(
    // remove password and refresh token field from response
        "-password -refreshToken" //these two fields wont get selected except these two others will get selected, VERY WEIRD SYNTAX
    ) 

    if(!createdUser){
        throw new ApiError(500,"Something went Wrong")
    }

    //return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")    
    )
})

export {registerUser}

