import mongoose,{Schema} from "mongoose";

const subscriptionSchema = ew Schema({
    subscriber :{
        type:Schema.Types.jectId, //who is subscribing
        ref:"User",
    },
    channel :{
        type:Schema.Types.ObjectId, //whome a subscriber is subscribing to
        ref:"User",
    }
    
}, {timestamps:true})


export const Subscription = mongoose.model("Subscription", subscriptionSchema)