////////////////////////////////////////////////////////////////////////////////////////////

const { Subscription } = require("../models/subscription.model")

//VERIFY USER SUBSCRIPTION TYPE
const handleverifyUserSubscriptionType = async (req, res, next)=>{
    const {id} = req.user
    try {
        const SubscriptionStatus = await Subscription.findOne({
            where:{userId:id}
        })
        if(!SubscriptionStatus){
            return res.status(404).json({
                message: "User Hasn't Subscribed to any category",
                statusCode: 404,
              });

        }
    } catch (error) {
        
    }
}