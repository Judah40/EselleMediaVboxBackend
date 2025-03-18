

////////////////////////////////////////////////////////////////////////////

const { Subscription } = require("../models/subscription.model")

//GET ALL SUBCRIPTION TYPE 
exports.handleGetAllSubscriptionType = async (req, res)=>{
    const {id} = req.user
    try {
        const subscriptionStatus = await Subscription.findOne({
            where:{userId:id}
        })
        if(!subscriptionStatus){
            return res.status(404).json({
                message: "User Hasn't Subscribed to any category",
                statusCode: 404,
              });
        }
        return res.status(200).json({
            message:"Successfully fetched subscription status", 
            data:subscriptionStatus
        })
    } catch (error) {
        res.status(500).json({ message: error.message, statusCode: 500 });

    }
}


////////////////////////////////////////////////////////////////////////////
//SUBSCRIBE TO A CERTAIN CATEGORY
exports.handleSubscribeToSingleOrMultipleCategories = async(req, res)=>{
    const {id} = req.user
    const {category} = req.body

    try {
        //CHECK SUBSCRIPTION STATUS
        const subscriptionStatus = await Subscription.findOne({
            where:{userId:id}
        })
        if(!subscriptionStatus){
            //CREATE NEW SUBCRIPTION
             await Subscription.create({
                userId:id, 
                subscriptionType:category
            })
            return res.status(200).json({
                message:"Successfully subscribed to category"
            })
        }
        //CHECK IF USER IS SCUBSCRIBED TO ALL CHANNEL
        if(subscriptionStatus.subscriptionType[0]==="All"){
            return res.status(400).json({
                message:"Already Subscribed to All Channels"
            })
        }
        //UPDATE SUBCRIPTION
        category.forEach(element => {
            if(!subscriptionStatus.includes(element)){
                subscriptionStatus.push(element)
            }
        });

        const updateSubscription = await Subscription.update({
            subscriptionType:subscriptionStatus
        },
    {
        where:{id:id}
    })
    if(!updateSubscription){
        return res.status(400).json({
            message: "Couldn't update subscription",
            statusCode: 400,
          });
    }
        return res.status(201).json({
            status:201, 
            message:"successfully updated subscription"
        })
    } catch (error) {
        res.status(500).json({ message: error.message, statusCode: 500 });

    }
}