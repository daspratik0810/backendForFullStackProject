import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//it will generate and return the access and refresh token
const generateAccessAndRefreshTokens = async(userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //user is an object and it has refresh token as property (see in mongoose user.model.js), so we are saving refresh token  in database
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave : false})
        
        return {accessToken, refreshToken}

    } catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

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
    // remove password and refresh token field from response, refresh tokens are expired after long time, and access token are expiered for short time
    // access tokens(short lived) are used for authentication of the user, and refresh token(long lived) are to talk to database and forauthentication tasks  
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

const loginUser = asyncHandler(async (req,res) => {
    //bring data from req body 
    // getting username or email 
    // find the user
    // if not then error, 
    // if user exists then password check
    // access and refresh token generation
    //send tokens via secure cookie
    // send final response 
    // ------------------------------------------------------------------------------------------------------------------

    //bring data from req body 
    const {email, username, password} = req.body

    // getting username or email
    if(!username || !email){
        throw new ApiError(400, "Username or email is required")
    }

    // find the user
    const user = await User.findOne({
        $or: [{username}, {email}]  //it will find value either based on username or email
    })

    // if not then error
    const(!user){
        throw new ApiError(404, "User does not exist")
    }

    // if user exists then password check
    const isPasswordValid = await user.isPasswordCorrect(password) //this password came from req.body from user
    
    const(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }
    
    // access and refresh token generation
   const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    //send tokens via secure cookie
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")       //dont send password and refreshToken to user
    // - sending cookies 
    const options = {
        httpOnly : true,
        secure: true
    }

    // send final response 
    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse(200,{
            user : loggedInUser, accessToken, refreshToken  
        }, "User logged in Seccessfully !!"
        )
    )

})

    //logout the user
    const logoutUser = asyncHandler(async(req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set : {
                    refreshToken : undefined 
                }
            },
            {
                new : true
            }
        )

        const options = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("accessToken",options)
        .json(new ApiResponse(200, {}, "User logged Out"))
    })

export {registerUser, loginUser, logoutUser}

