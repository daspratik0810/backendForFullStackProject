import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index:true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String,  //use cloudinary url
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        coverImage : {
            type : String,  //use cloudinary url
        }, 
        watchHistory :  [ 
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            required :  [true,"Password is required !!"]
        },
        refreshToken : {
            type : String,
        },     
    }, {timestamps : true}
)

//want to perform the function whenever the data is getting saved, here the function hashes(similar to encryption) the password with 10 hashrounds/salts
userSchema.pre("save", async function(next) {
    if( this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    return next()
})

//custom methods with userSchema
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model(User,userSchema)