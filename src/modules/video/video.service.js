const { uploadFile } = require("../../services/supabase");
const { randomName } = require("../../utils/generators/generateRandomNames");
const { resizedImage } = require("../../utils/resizer/postImageResizer");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { Post } = require("../../models/post.model");
const { Readable } = require("stream");
exports.postVideoService = async (
  title,
  description,
  genre,
  location,
  userId,
  thumbnails,
  banner,
  fullVideo
) => {
  const thumbnailName = randomName();
  const bannerName = randomName();
  const fullVideoName = randomName();

  const resizedThumbnail = await resizedImage(1080, 1920, thumbnails.buffer);
  const resizedBanner = await resizedImage(1080, 1920, banner.buffer);
  await uploadFile(resizedBanner, banner.mimetype, "posts/", bannerName);
  await uploadFile(
    fullVideo.buffer,
    fullVideo.mimetype,
    "posts/",
    fullVideoName
  );
  await uploadFile(
    resizedThumbnail,
    thumbnails.mimetype,
    "posts/",
    thumbnailName
  );
  const stream = Readable.from(fullVideo.buffer);

  const duration = await getVideoDurationInSeconds(stream);
  await Post.create({
    title,
    description,
    genre,
    location,
    userId,
    duration: parseInt(duration),
    bannerUrl: bannerName,
    thumbnailUrl: thumbnailName,
    videoUrl: fullVideoName,
  });
};
