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

app.use(express.json({limit : "50mb"}))
//URLencoded : Configures how the URL-encoded body is parsed; it accepts the properties below.
app.use(express.urlencoded({extended :true, limit : "15kb"}))

//express.static : The root directory from which to serve static assets/static files like images, favicon, etc
app.use(express.static("public"))

//cookie-parser : To access user cookies and set cookies from server ( to perform CRED operation for cookies ).Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
app.use(cookieParser())

//routes(routers) import
import userRouter from "./routes/user.routes.js"
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import videoRouter from "./routes/video.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

//routes declaration, when a user routes itself to /users, then the control goes to userRouter, where /register is routing or using POST to registerUser which passes it to an asyncHandler function and gives status 200 (OK)  
//http:localhost:8000/api/v1/users/register
app.use("/api/v1/users",userRouter)
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);


export {app}