import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//Middleware in Express.js are functions that run during the request–response lifecycle to process requests, modify responses, and control application flow.
//In Express.js, middleware functions are executed sequentially in the order they are added to the application.
//"app.use" is always used when we need to do handle configurations and middlewares(cors and cookie-parser) 
//CORS is a Node.js middleware for Express/Connect that sets CORS response headers. These headers tell browsers which origins can read responses from your server.
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit : "15kb"}))
//urlencoded : Configures how the URL-encoded body is parsed; it accepts the properties below.
app.use(express.urlencoded({extended :true, limit : "15kb"}))

//express.static : The root directory from which to serve static assets/static files
app.use(express.static("public"))

//cookie-parser : Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
app.use(cookieParser())


export {app}