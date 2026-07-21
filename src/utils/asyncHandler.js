//Async functions always return a promise.
//the promise is resolved with "resolve" or error is caught by catch
const asyncHandler = (requestHandler) => {
    (req,res,next) =>{
        //promise has two parts, a resolve and a reject/catch
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}