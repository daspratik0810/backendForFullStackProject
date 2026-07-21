// always use try-catch and async-await in database connection, because it is more professional to catch errors or to take time while connection of database
import mongoose from "mongoose"
import connectDB from "./db/index.js"

import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

connectDB()
.then( ()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT || 8000}`)
    })
})
.catch((err) => {
    console.log("MONGODb connection failed !!",err)
}) 

/*
//SECOND APPROACH - IIFE - Immediately Invoked Function Expression ()()
import express from "express"
const app = express()
( async()=> {
    try{
        await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on( "ERROR",(error)=>{
            console.log("ERROR - ",error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`APPLICATION IS LISTENING ON PORT ${process.env.PORT}`)
        })
    
    
    }catch(error) {
        console.error("ERROR",error)
        throw error
    }

})()
*/