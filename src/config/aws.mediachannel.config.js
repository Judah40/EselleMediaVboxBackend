const { roleArn } = require("../config/default.config");

/**
 * @description This is the configuration file for the AWS MediaLive service.
 * @param {string} MediaChannelConfig - The access key for the AWS account.
 * @function MediaLiveConfig
 * @param {string} destinationId - The destination ID for the AWS MediaLive service.
 * @param {string} inputId - The input ID for the AWS MediaLive service.
 */ exports.channelConfig = (
  ChannelName,
  inputId,
  destinationId,
  mediaPackageChannelId,
  mediaPackageIngestUrl
) => {
  if (!ChannelName || ChannelName.trim() === "") {
    throw new Error("ChannelName is required and cannot be empty.");
  }

  // console.log(
  //   ChannelName,
  //   inputId,
  //   destinationId,
  //   mediaPackageChannelId,
  //   mediaPackageIngestUrl
  // );

  const params = {
    Name: ChannelName,
    RoleArn: roleArn, // Replace with your actual role ARN
    InputAttachments: [
      {
        InputId: inputId,
        InputSettings: {
          AudioSelectors: [{ Name: "default" }],
          DeblockFilter: "DISABLED",
          DenoiseFilter: "DISABLED",
          FilterStrength: 1,
          InputFilter: "AUTO",
          SourceEndBehavior: "CONTINUE",
          VideoSelector: { ColorSpace: "FOLLOW" },
        },
      },
    ],
    ChannelClass: "SINGLE_PIPELINE",
    Destinations: [
      {
        Id: `${destinationId}-1`,
        MediaPackageSettings: [
          {
            ChannelId: mediaPackageChannelId,
          },
        ],
      },
    ],
    EncoderSettings: {
      TimecodeConfig: { Source: "SYSTEMCLOCK" },
      VideoDescriptions: [
        {
          Name: "video1",
          CodecSettings: {
            H264Settings: {
              Bitrate: 2000000,
              RateControlMode: "CBR",
              FramerateControl: "SPECIFIED",
              FramerateNumerator: 30,
              FramerateDenominator: 1,
              ParControl: "SPECIFIED", // Explicitly set PAR control
              ParNumerator: 1, // Set numerator (e.g., 1)
              ParDenominator: 1, // Set denominator (e.g., 1)
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
              Bitrate: 96000,
              CodingMode: "CODING_MODE_2_0",
              SampleRate: 48000,
            },
          },
        },
      ],
      OutputGroups: [
        {
          Name: "MediaPackage Group",
          OutputGroupSettings: {
            MediaPackageGroupSettings: {
              Destination: {
                DestinationRefId: `${destinationId}-1`,
              },
            },
          },
          Outputs: [
            {
              OutputSettings: {
                MediaPackageOutputSettings: {},
              },
              VideoDescriptionName: "video1",
              AudioDescriptionNames: ["audio1"],
              OutputName: "MediaPackageOutput", // Added output name
            },
          ],
        },
      ],
    },
  };

  return params;
};
