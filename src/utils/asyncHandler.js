//Async functions always return a promise.
//alternatevely we can also use try-catch and async-await 
//here the promise is resolved with "resolve" or error is caught by catch
const asyncHandler = (requestHandler) => {
    return (req,res,next) =>{
        //promise has two parts, a resolve and a reject/catch
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}