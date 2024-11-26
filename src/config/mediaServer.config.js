const NodeMediaServer = require("node-media-server");

//////////////////////////////////////////////////////////////////////////
//MEDIA SERVER CONFIGURATION
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    ping: 30,
    ping_timeout: 60,
    gop_cache: true,
  },
  http: {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./media",
  },
  trans: {
    ffmpeg: "/usr/bin/ffmpeg", // Set the correct ffmpeg path here
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: false,
      },
    ],
  },
};

const nms = new NodeMediaServer(config);

module.exports = { nms };
