const { mediaPackage } = require("../../config/aws.config");

exports.createMediaPackageChannel = async (channelId) => {
const params = {
    Id: channelId,
    Description: `${channelId} MediaPackage Channel`,
    Tags: {
        Name: `${channelId} MediaPackage Channel`,
    },
}

    try {
        const data = await mediaPackage.createChannel(params).promise();
        console.log("Channel created successfully:", data);
        return data;
    } catch (error) {
        console.error("Error creating channel:", error);
        throw new Error("Failed to create channel");
}
}