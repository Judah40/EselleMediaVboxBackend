const { roleArn } = require("../config/default.config");

/**
 * @description This is the configuration file for the AWS MediaLive service.
 * @param {string} MediaChannelConfig - The access key for the AWS account.
 * @function MediaLiveConfig
 * @param {string} destinationId - The destination ID for the AWS MediaLive service.
 * @param {string} inputId - The input ID for the AWS MediaLive service.
 */
exports.channelConfig = (
  ChannelName,
  inputId,
  destinationId,
  destinationUrl, // Single destination URL
  arn,
  streamName
) => {
  if (!ChannelName || ChannelName.trim() === "") {
    throw new Error("ChannelName is required and cannot be empty.");
  }

  console.log({ ChannelName, inputId, destinationId, destinationUrl, arn });
  const params = {
    Name: ChannelName, // Channel name
    RoleArn: roleArn, // IAM role with MediaLive permissions
    InputAttachments: [
      {
        InputId: inputId, // Input ID for your live stream source (e.g., RTMP)
        InputSettings: {
          AudioSelectors: [
            {
              Name: "default",
            },
          ],
          DeblockFilter: "DISABLED",
          DenoiseFilter: "DISABLED",
          FilterStrength: 1,
          InputFilter: "AUTO",
          SourceEndBehavior: "CONTINUE",
          VideoSelector: {
            ColorSpace: "FOLLOW",
          },
        },
      },
    ],
    ChannelClass: "SINGLE_PIPELINE", // Change from STANDARD to SINGLE_PIPELINE
    Destinations: [
      {
        Id: `${destinationId}-1`, // First destination with ID
        Settings: [
          {
            Url: destinationUrl, // First destination URL (same URL)
            StreamName: `stream1-${streamName}`,
          }
        ],
      },
    ],
    EncoderSettings: {
      TimecodeConfig: {
        Source: "SYSTEMCLOCK", // Required for handling timestamps
      },
      VideoDescriptions: [
        {
          Name: "video1",
          CodecSettings: {
            H264Settings: {
              Bitrate: 2000000, // Set bitrate (adjust based on quality needs)
              RateControlMode: "CBR", // Constant Bitrate
              FramerateControl: "SPECIFIED",
              FramerateNumerator: 30,
              FramerateDenominator: 1,
            },
          },
          Width: 1280,
          Height: 720,
        },
      ],
      AudioDescriptions: [
        {
          Name: "audio1",
          AudioSelectorName: "default",
          CodecSettings: {
            AacSettings: {
              Bitrate: 96000, // Adjust based on needs
              CodingMode: "CODING_MODE_2_0",
              SampleRate: 48000,
            },
          },
        },
      ],
      OutputGroups: [
        {
          Name: "RTMP Group",
          OutputGroupSettings: {
            RtmpGroupSettings: {},
          },
          Outputs: [
            {
              OutputSettings: {
                RtmpOutputSettings: {
                  Destination: {
                    DestinationRefId: `${destinationId}-1`,
                  },
                },
              },
              VideoDescriptionName: "video1",
              AudioDescriptionNames: ["audio1"],
            },
          ],
        },
      ],
    },
  };

  return params;
};
