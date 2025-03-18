/**
 * @description This service gets a MediaLive input by its name
 * @param {string} name - The name of the input
 */

const { medialLive } = require("../../config/aws.config");

exports.getMediaLiveInputByName = async (name) => {
  try {
    const data = await medialLive.listInputs().promise();
    const input = data.Inputs.find((inp) => inp.Name === name);
    if (!input) {
      console.error("MediaLive input not found");
      return null;
    }
    const destinations = await medialLive
      .describeInput({ InputId: input.Id })
      .promise();
    const params = {
      InputId: input.Id,
      destinationUrl: destinations.Destinations[0].Url,
      arn: input.Arn,
      streamName: input.Name,
    };
    return params;
  } catch (error) {
    console.error("Error fetching MediaLive input:", error);
    return null;
  }
};
