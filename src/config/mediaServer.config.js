const NodeMediaServer = require("node-media-server");
const { uploadLiveStreamVideoToS3asVideoOnDemand } = require("../utils/Stream/liveStremS3BucketUpload");
const path = require("path");
const viewerCounts = {};

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
    ffmpeg: "/usr/bin/ffmpeg",
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

nms.on("prePlay", (id, StreamPath) => {
  console.log(`[NodeEvent on prePlay] id=${id} StreamPath=${StreamPath}`);
  const streamKey = StreamPath.split("/").pop();
  if (!viewerCounts[streamKey]) {
    viewerCounts[streamKey] = 0;
  }
  viewerCounts[streamKey]++;
  console.log(`Current viewers on ${streamKey}: ${viewerCounts[streamKey]}`);
});

nms.on("donePlay", (id, StreamPath) => {
  console.log(`[NodeEvent on donePlay] id=${id} StreamPath=${StreamPath}`);
  const streamKey = StreamPath.split("/").pop();
  if (viewerCounts[streamKey]) {
    viewerCounts[streamKey]--;
    console.log(`Current viewers on ${streamKey}: ${viewerCounts[streamKey]}`);
  }
});




// Node Media Server event: Handle stream ending
nms.on("donePublish", async (id, StreamPath) => {
  console.log(`[NodeEvent on donePublish] id=${id} StreamPath=${StreamPath}`);
  const streamKey = StreamPath.split("/").pop();
  const recordedFilePath = path.join(__dirname, "media", "live", `${streamKey}.mp4`);

  if (fs.existsSync(recordedFilePath)) {
    console.log(`Uploading ${recordedFilePath} to S3...`);
    try {
      await uploadLiveStreamVideoToS3asVideoOnDemand(recordedFilePath, streamKey);
    } catch (err) {
      console.error(`Failed to upload video for stream ${streamKey}:`, err);
    }
  } else {
    console.log(`No recorded file found for stream ${streamKey}`);
  }
});
module.exports = { nms, viewerCounts };
