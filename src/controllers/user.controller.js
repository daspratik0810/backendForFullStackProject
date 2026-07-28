import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res) => {
    console.log("registerUser called");  //we will see this in terminal if POSTMAN or anyone access it, make sure the visibility is public in PORT tab in the bottom here
    res.status(200).json({
        message : "ok"
    })
})

export {registerUser}

