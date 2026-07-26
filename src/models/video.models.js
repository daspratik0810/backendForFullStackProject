import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new mongoose.Schema(
    {
        videoFile : {
            type : String,  //use cloudinary url
            required : true,
        },
        thumbnail : {
            type : String, //use cloudinary url
            required : true,
        },
        title : {
            type : String,
            required : true,
        },
        descsription : {
            type : String,  
            required : true,
        },
        duration : {
            type : Number,  //use cloudinary url
            required : true 
        }, 
        views :  
            {
                type : Number,
                default : 0
            },
        isPlublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },     
    }, {timestamps : true}
)

//plugin Plugins are a way to package these hooks (along with custom methods and statics) into reusable blocks of code that can be applied to multiple schemas.
//A plugin is simply a packaging mechanism. It is a way to bundle up reusable Mongoose code (like adding fields, methods, or hooks) into a single JavaScript function so you can easily apply it to multiple different Schemas.
//In Mongoose, "hooks" and "middleware" mean the exact same thing. A hook is a function that tells Mongoose: "Hey, before (or after) you run a database operation, stop and run this custom code first." * schema.pre() is a "pre-hook" (runs before the database operation)
//schema.post() is a "post-hook" (runs after the database operation). 
videoSchema.plugin(mongooseAggregatePaginate) 
export const Video = mongoose.model(Video,videoSchema)