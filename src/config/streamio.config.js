const { StreamChat } = require("stream-chat");
const { StreamClient } = require("@stream-io/node-sdk");
const { streamIoKey, streamIoSecret } = require("./default.config");

exports.chatclient = StreamChat.getInstance(streamIoKey, streamIoSecret);

exports.videoClient = new StreamClient(streamIoKey, streamIoSecret);
